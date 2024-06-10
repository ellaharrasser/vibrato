import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useModal } from '../../../context/Modal';
import { getKeys } from '../../../utils/misc';
import { thunkEditShop } from '../../../redux/shops';
import './EditShopModal.css';


function EditShopModal({ shop }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState(shop.name);
    const [description, setDescription] = useState(shop.description);

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

        return newValidations;
    }, [name, description]);

    useEffect(() => {
        if (!hasSubmitted) return; // Prevent validations until initial submission
        const newValidations = getValidations();
        setValidations(newValidations);
        setSubmitDisabledStatus(getKeys(newValidations).length);
    }, [hasSubmitted, getValidations]);

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
        // setImageLoading(true);

        const serverResponse = await dispatch(thunkEditShop(formData, shop.id));
        if (serverResponse.shop) {
            closeModal();
        } else if (serverResponse) {
            setErrors(serverResponse);
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
            </form>
        </div>
    );
}

export default EditShopModal;
