import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'; // Import your CSS file for styling

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        username: username,
        password: password
      });

      console.log('Login successful:', response.data);
      // Handle successful login, e.g., redirect or set user state
    } catch (error) {
      console.error('Login error:', error);
      // Handle error, e.g., show error message to user
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
