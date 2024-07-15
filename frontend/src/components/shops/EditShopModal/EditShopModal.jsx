import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useModal } from '../../../context/Modal';
import { getKeys, endsWithOne, imageSuffixes } from '../../../utils/misc';
import { thunkEditShop } from '../../../redux/shops';
import './EditShopModal.css';


function EditShopModal({ shop }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState(shop.name);
    const [description, setDescription] = useState(shop.description);
    const [image, setImage] = useState(undefined);
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [imageLoading, setImageLoading] = useState(false);

    const [validations, setValidations] = useState({});
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [submitClass, setSubmitClass] = useState('submit');

    const setSubmitDisabledStatus = (disabled) => {
      (disabled)
        ? setSubmitClass('submit disabled')
        : setSubmitClass('submit');
      setSubmitDisabled(disabled);
    };

    const getValidations = useCallback(() => {
        const newValidations = {};

        if (!name) {
            newValidations.name = 'A name is required.';
        } else if (name.length > 255) {
            newValidations.name = 'Names must be 255 or fewer characters.';
        }

        if (!description) {
            newValidations.description = 'A description is required.';
        } else if (description.length > 255) {
            newValidations.description = 'Descriptions must be 255 or fewer characters.';
        }

        if (file && !endsWithOne(filename, imageSuffixes)) {
            newValidations.image = 'An image must be a pdf, png, jpg, jpeg, or gif.'
        }

        return newValidations;
    }, [name, description, file, filename]);

    useEffect(() => {
        if (!hasSubmitted) return; // Prevent validations until initial submission
        const newValidations = getValidations();
        setValidations(newValidations);
        setSubmitDisabledStatus(getKeys(newValidations).length);
    }, [hasSubmitted, getValidations]);

    // Helper function for generating thumbnail URL and setting image states
        const fileWrap = (e) => {
        e.stopPropagation();

        const tempFile = e.target.files[0];

        // Limit image size to 5 Mb
        if (tempFile.size > 5000000) {
            setFilename('Image must be less than 5 Mb.');
            return;
        }

        // Generate local thumbnail URL
        const newImageURL = URL.createObjectURL(tempFile);
        setImage(newImageURL);
        setFile(tempFile);
        setFilename(tempFile.name);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        /* Prevent submission if validation errors exist,
        or if no fields have changed */
        if (!hasSubmitted) {
            setHasSubmitted(true);
            const newValidations = getValidations();
            if (getKeys(newValidations).length) return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (file) formData.append('image', file);
        setImageLoading(true);

        const serverResponse = await dispatch(
            thunkEditShop(formData, shop.id)
        );

        if (serverResponse.shop) {
            closeModal();
        } else if (serverResponse) {
            setErrors(serverResponse);
            setImageLoading(false);
        }
    };

    return (
        <div id='edit-shop-wrapper'>
            <h1>Edit an existing Shop</h1>
            <form
                id='edit-shop-form'
                onSubmit={handleSubmit}
                encType='multipart/form-data'
            >
                <div className='form-item-container'>
                    <div className='form-item-text'>
                        <label htmlFor='name'>Name</label>
                        <span className='form-error'>
                            {validations.name && validations.name
                            || errors.name && errors.name}
                        </span>
                    </div>
                    <input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-item-container'>
                    <div className='form-item-text'>
                        <label htmlFor='description'>Description</label>
                        <span className='form-error'>
                            {validations.description && validations.description
                            || errors.description && errors.description}
                        </span>
                    </div>
                    <input
                        id='description'
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='form-item-container' id='image-upload-container'>
                    <div className='form-item-text'>
                        <label>Image</label>
                        <p className='form-error'>
                            {validations.image && validations.image
                            || errors.image && errors.image}
                        </p>
                    </div>
                    <label className='image-upload' htmlFor='image'>
                        Upload Image
                    </label>
                    <input
                        id='image'
                        type='file'
                        accept='image/*'
                        onChange={fileWrap}
                    />
                    <img
                        className='image-upload-thumbnail'
                        src={image}
                    />
                    <span className='filename'>{filename || 'No file selected - image will not be updated.'}</span>
                </div>
                <p className='form-error'>
                    {errors.server && errors.server}
                </p>
                <div className='buttons-container'>
                    <button
                        type='submit'
                        className={submitClass}
                        disabled={submitDisabled}
                    >
                        Confirm Edits
                    </button>
                    <button
                        type='button'
                        className='cancel-button'
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
                <p className='loading'>
                    {imageLoading && 'Loading...'}
                </p>
            </form>
        </div>
    );
}

export default EditShopModal;
