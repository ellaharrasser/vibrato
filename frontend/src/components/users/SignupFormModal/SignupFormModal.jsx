import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useModal } from '../../../context/Modal';
import { getKeys } from '../../../utils/misc';
import { validateEmail } from '../../../utils/validate';
import { thunkSignup } from '../../../redux/session';
import './SignupForm.css';


function SignupFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
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
      newValidations.email = 'An email is required.';
    } else if (!validateEmail(email)) {
      newValidations.email = 'The email\'s format is invalid.';
    } else if (email.length > 255) {
      newValidations.email = 'Emails must be 255 or fewer characters.';
    }

    if (!name) {
      newValidations.name = 'A name is required.';
    } else if (name.length > 255) {
      newValidations.name = 'Names must be 255 or fewer characters.';
    }

    if (description.length > 255) {
      newValidations.description = 'Descriptions must be 255 or fewer characters.';
    }

    if (!file) {
      newValidations.profileImage = 'A profile image is required.';
    }

    if (password.length < 8) {
      newValidations.password = 'Passwords must be 8 or more characters.';
    } else if (password.length > 255) {
      newValidations.password = 'Passwords must be 255 or fewer characters.';
    } else if (password !== confirmPassword) {
      newValidations.confirmPassword = 'Both passwords must match.';
    }

    return newValidations;
  }, [email, name, description, file, password, confirmPassword]);

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
    setProfileImage(newImageURL);
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
    formData.append('email', email);
    formData.append('name', name);
    formData.append('password', password);
    formData.append('profile_image', file);
    formData.append('description', description);
    setImageLoading(true);

    const serverResponse = await dispatch(thunkSignup(formData));
    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return <div id='signup-wrapper'>
    <h1>Sign Up</h1>
    <form
      id='signup-form'
      onSubmit={handleSubmit}
      encType='multipart/form-data'
    >
      <div className='form-item-container'>
        <div className='form-item-text'>
          <label htmlFor='email'>Email</label>
          <span className='form-error'>
            {validations.email && validations.email
            || errors.email && errors.email}
          </span>
        </div>
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
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
      <div className='form-item-container' id='image-upload-container'>
        <div className='form-item-text'>
          <label htmlFor='profile-image'>Profile Image</label>
          <span className='form-error'>
            {validations.profileImage && validations.profileImage
            || errors.profileImage && errors.profileImage}
          </span>
        </div>
        <label className='image-upload' htmlFor='profile-image'>
          Upload Image
        </label>
        <input
          id='profile-image'
          type='file'
          accept='image/*'
          onChange={fileWrap}
        />
        <img
          className='image-upload-thumbnail'
          src={profileImage}
        />
        <span className='filename'>{filename || 'No file selected.'}</span>
      </div>
      <div className='form-item-container'>
        <div className='form-item-text'>
          <label htmlFor='description'>Description</label>
          <span className='form-error'>
            {validations.description && validations.description
            || errors.description && errors.description}
          </span>
        </div>
      </div>
      <textarea
        id='description'
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className='form-item-container'>
        <div className='form-item-text'>
          <label htmlFor='password'>Password</label>
          <span className='form-error'>
            {validations.password && validations.password
            || errors.password && errors.password}
          </span>
        </div>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='form-item-container'>
        <div className='form-item-text'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <span className='form-error'>
            {validations.confirmPassword && validations.confirmPassword}
          </span>
        </div>
        <input
          id='confirm-password'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {errors.server && <p className='server-error'>{errors.server}</p>}
      <div className='buttons-container'>
        <button
          type='submit'
          className={submitClass}
          disabled={submitDisabled}
        >
          Sign Up
        </button>
        <button
          type='button'
          className='cancel-button'
          onClick={closeModal}
        >
          Cancel
        </button>
      <p className='image-loading'>
        {imageLoading && 'Loading...'}
      </p>
      </div>
    </form>
  </div>
}

export default SignupFormModal;
