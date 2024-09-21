import React, { useState } from 'react';
import './LoginAsAdmin.css';

const LoginAsAdmin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'Admin' && password === '1234') {
      setToastMessage('Logged in Successfully');
      setShowToast(true);
      onLogin(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } else {
      setToastMessage('Wrong password/Username entered, please check again');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username(Admin)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password(1234)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {showToast && <div className="toast show">{toastMessage}</div>}
    </div>
  );
};

export default LoginAsAdmin;
