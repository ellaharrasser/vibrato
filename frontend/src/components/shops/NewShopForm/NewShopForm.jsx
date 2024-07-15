import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getKeys } from '../../../utils/misc';
import { thunkNewShop } from '../../../redux/shops';
import './NewShopForm.css';


function NewShopForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
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

        if (!file) {
            newValidations.image = 'An image is required.';
        }

        return newValidations;
    }, [name, description, file]);

    useEffect(() => {
        if (!hasSubmitted) return; // Prevent validations until initial submission
        const newValidations = getValidations();
        setSubmitDisabledStatus(getKeys(newValidations).length > 0);
        setValidations(newValidations);
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

        if (!hasSubmitted) { // Prevent submission if validation errors exist
            setHasSubmitted(true);
            const newValidations = getValidations();
            if (getKeys(newValidations).length) return;
        }

        const formData = new FormData();
        formData.append('owner_id', user.id);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', file);
        setImageLoading(true);

        const serverResponse = await dispatch(thunkNewShop(formData));
        if (serverResponse.shop) {
            navigate(`/shops/${serverResponse.shop.id}`);
        } else if (serverResponse) {
            setErrors(serverResponse);
        }
    };

    return <main id='new-shop-page'>
        <h1>Create a Shop</h1>
        <form
            id='new-shop-form'
            onSubmit={handleSubmit}
            encType='multipart/form-data'
        >
            <div className='form-item-container'>
                <div className='form-item-text'>
                    <label htmlFor='name'>Name</label>
                    <p className='form-error'>
                        {validations.name && validations.name
                        || errors.name && errors.name}
                    </p>
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
                    <p className='form-error'>
                        {validations.description && validations.description
                        || errors.description && errors.description}
                    </p>
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
                <span className='filename'>{filename || 'No file selected.'}</span>
            </div>
            {errors.server && <p className='server-error'>{errors.server}</p>}
            <div className='buttons-container'>
                <button
                    type='submit'
                    className={submitClass}
                    disabled={submitDisabled}
                >
                    Create Shop
                </button>
            </div>
            <p className='loading'>
                {imageLoading && 'Loading...'}
            </p>
        </form>
    </main>
}

export default NewShopForm;
