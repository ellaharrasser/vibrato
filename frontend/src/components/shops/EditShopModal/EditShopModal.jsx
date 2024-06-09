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
        <>
            <h1>Edit an existing Shop</h1>
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
                <button
                    type='submit'
                    className={submitClass}
                    disabled={submitDisabled}
                >
                    Confirm Edits
                </button>
            </form>
        </>
    );
}

export default EditShopModal;
