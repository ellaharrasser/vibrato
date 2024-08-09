import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useModal } from '../../context/Modal';
import { getKeys, endsWithOne, imageSuffixes } from '../../utils/misc';
import { thunkEditShop } from '../../redux/shops';


function EditShopModal({ shop }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState(shop.name);
    const [description, setDescription] = useState(shop.description);
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [imageLoading, setImageLoading] = useState(false);

    const [validations, setValidations] = useState({});
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [submitClass, setSubmitClass] = useState('button-submit');

    const setSubmitDisabledStatus = (disabled) => {
      (disabled)
        ? setSubmitClass('button-submit-disabled')
        : setSubmitClass('button-submit');
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
        <div className='container px-8 py-4 flex flex-col flex-nowrap items-center gap-2 bg-white border border-stone-200 rounded-xl overflow-hidden'>
            <h1 className='my-8 text-3xl font-bold'>
                Edit an existing Shop
            </h1>
            <form
                onSubmit={handleSubmit}
                encType='multipart/form-data'
                className='container max-w-[60ch] flex flex-col flex-nowrap justify-center items-start gap-4'
            >
                <div className='container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor='name' className='text-lg font-semibold'>
                            Name
                        </label>
                        <p className='text-error'>
                            {validations.name && validations.name
                            || errors.name && errors.name}
                        </p>
                    </div>
                    <input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full px-1 border border-stone-400 rounded-md'
                    />
                </div>
                <div className='container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
                    <div className='flex items-center gap-2'>
                        <label htmlFor='description' className='text-lg font-semibold'>
                            Description
                        </label>
                        <p className='text-error'>
                            {validations.description && validations.description
                            || errors.description && errors.description}
                        </p>
                    </div>
                    <input
                        id='description'
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full px-1 border border-stone-400 rounded-md'
                    />
                </div>
                <div className='container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
                    <div className='flex items-center gap-2'>
                        <label className='text-lg font-semibold'>
                            Image
                        </label>
                        <p className='text-error'>
                            {validations.image && validations.image
                            || errors.image && errors.image}
                        </p>
                    </div>
                    <label htmlFor='image' className='underline cursor-pointer text-stone-800 transition-colors hover:text-teal-500'>
                        {filename || 'Upload an image (Optional)'}
                    </label>
                    <input
                        id='image'
                        type='file'
                        accept='image/*'
                        onChange={fileWrap}
                        className='hidden'
                    />
                    <img
                        src={image}
                        className='w-auto h-full max-w-16 max-h-16'
                    />
                </div>
                <p className='text-error'>
                    {errors.server && errors.server}
                </p>
                <div className='w-full self-center flex flex-row flex-nowrap justify-center gap-4'>
                    <button
                        type='submit'
                        className={submitClass}
                        disabled={submitDisabled}
                    >
                        Confirm Edits
                    </button>
                    <button
                        type='button'
                        onClick={closeModal}
                        className='button-cancel'
                    >
                        Cancel
                    </button>
                </div>
                <p className='text-base text-stone-800'>
                    {imageLoading && 'Loading...'}
                </p>
            </form>
        </div>
    );
}

export default EditShopModal;
