import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { thunkLogin } from '../../../redux/session';
import { useModal } from '../../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return <div id='login-wrapper'>
    <h1>Log In</h1>
    <form
      id='login-form'
      onSubmit={handleSubmit}
    >
      <div className='form-item-container'>
        <div className='form-item-text'>
          <label htmlFor='email'>Email</label>
          <span className='form-error'>
            {errors.email && errors.email}
          </span>
        </div>
        <input
          id='email'
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-item-container'>
        <div className='form-item-text'>
          <label htmlFor='password'>Password</label>
          <span className='form-error'>
            {errors.password && errors.password}
          </span>
        </div>
        <input
          id='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <p className='form-error'>
        {errors.server && errors.server}
      </p>
      <div className='buttons-container'>
        <button
          type='submit'
          className='submit'
        >
          Log In
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
  </div>;
}

export default LoginFormModal;
