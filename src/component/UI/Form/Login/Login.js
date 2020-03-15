import React, { useState } from 'react';
import Button from 'component/UI/Button/Button';
import styles from './Login.module.css';

const Login = () => {
  const [token, setToken] = useState('');

  const submitFormHandler = (event) => {
    event.preventDefault();
    localStorage.setItem('token', token);
    window.location.reload();
  };

  return (
    <div className={styles.Login}>
      <form onSubmit={submitFormHandler}>
        <h1>GitHub Repository Search</h1>
        <input
          type="password"
          name="token"
          value={token}
          onChange={
            (event) => setToken(event.target.value)
          }
          placeholder="Enter GitHub token"
        />
        <Button type="submit" btnType="Success">Submit</Button>
      </form>
    </div>
  );
};

export default Login;
