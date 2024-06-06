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

        if (!image) {
            newValidations.image = 'An image is required.';
        }

        return newValidations;
    }, [name, description, image]);

    useEffect(() => {
        if (!hasSubmitted) return; // Prevent validations until initial submission
        const newValidations = getValidations();
        setSubmitDisabledStatus(getKeys(newValidations).length > 0);
        setValidations(newValidations);
    }, [hasSubmitted, getValidations]);

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
        formData.append('image', image);
        setImageLoading(true);

        const serverResponse = await dispatch(thunkNewShop(formData));
        if (serverResponse.shop) {
            navigate(`/shops/${serverResponse.shop.id}`);
        } else if (serverResponse) {
            setErrors(serverResponse);
        }
    };

    return (
        <main>
            <h1>Create a Shop</h1>
            {errors.server && <p className='server-error'>{errors.server}</p>}
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='form-item-container'>
                    <label htmlFor='name'>Name</label>
                    <p className='form-error'>
                        {validations.name && validations.name
                        || errors.name && errors.name}
                    </p>
                    <input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-item-container'>
                    <label htmlFor='description'>Description</label>
                    <p className='form-error'>
                        {validations.description && validations.description
                        || errors.description && errors.description}
                    </p>
                    <input
                        id='description'
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='form-item-container'>
                    <label htmlFor='image'>Image</label>
                    <p className='form-error'>
                        {validations.image && validations.image
                        || errors.image && errors.image}
                    </p>
                    <input
                        id='image'
                        type='file'
                        accept='image/*'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <button
                    type='submit'
                    className={submitClass}
                    disabled={submitDisabled}
                >
                    Create Shop
                </button>
                <p className='image-loading'>
                    {imageLoading && 'Loading...'}
                </p>
            </form>
        </main>
    )
}

export default NewShopForm;
