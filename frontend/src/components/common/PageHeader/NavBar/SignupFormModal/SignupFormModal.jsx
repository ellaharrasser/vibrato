import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { validateEmail } from '../../../../../utils/validate';
import { getKeys } from '../../../../../utils/misc';
import { thunkSignup } from '../../../../../redux/session';
import { useModal } from '../../../../../context/Modal';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

    if (!email) {
      newValidations.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newValidations.email = 'Email format is invalid';
    } else if (email.length > 255) {
      newValidations.email = 'Email must be 255 or fewer characters';
    }

    if (!name) {
      newValidations.name = 'Name is required';
    } else if (name.length > 255) {
      newValidations.name = 'Name must be 255 or fewer characters';
    }

    if (description.length > 255) {
      newValidations.description = 'Description must be 255 or fewer characters';
    }

    if (password.length < 8) {
      newValidations.password = 'Password must be 8 or more characters';
    } else if (password.length > 255) {
      newValidations.password = 'Password must be 255 or fewer characters';
    } else if (password !== confirmPassword) {
      newValidations.confirmPassword = 'Both passwords must match';
    }

    return newValidations;
  }, [email, name, description, password, confirmPassword]);

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
    formData.append('email', email);
    formData.append('name', name);
    formData.append('password', password);
    formData.append('profile_image', profileImage);
    formData.append('description', description);
    setImageLoading(true);

    const serverResponse = await dispatch(thunkSignup(formData));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p className='form-error'>{errors.server}</p>}
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <label>
          Email
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {validations.email && (
          <p className='form-error'>{validations.email}</p>
        ) || errors.email && (
          <p className='form-error'>{errors.email}</p>
        )}
        <label>
          Name
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {validations.name && (
          <p className='form-error'>{validations.name}</p>
        ) || errors.name && (
          <p className='form-error'>{errors.name}</p>
        )}
        <label>
          Profile Image
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </label>
        {errors.profileImage && (
          <p className='form-error'>{errors.profileImage}</p>
        )}
        {imageLoading && <p>Loading...</p>}
        <label>
          Description
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        {validations.description && (
          <p className='form-error'>{validations.description}</p>
        ) || errors.description && (
          <p className='form-error'>{errors.description}</p>
        )}
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {validations.password && (
          <p className='form-error'>{validations.password}</p>
        ) || errors.password && (
          <p className='form-error'>{errors.password}</p>
        )}
        <label>
          Confirm Password
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {validations.confirmPassword && (
          <p className='form-error'>{validations.confirmPassword}</p>
        )}
        <button
          type='submit'
          className={submitClass}
          disabled={submitDisabled}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
