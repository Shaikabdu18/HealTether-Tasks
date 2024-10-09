import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true); // New state to track form type

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/users/register', formData);
      if (response.status === 201) {
        alert('Registration successful! Please log in.');
        setIsRegistering(false); // Switch to login form
      }
    } catch (error) {
      // Display exact error messages from the server
      const errorMsg = error.response?.data?.msg || error.response?.data?.errors.map(err => err.msg).join(', ') || error.message;
      alert('Error during registration: ' + errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/users/login', formData);
      if (response.status === 200) {
        alert('Login successful!');
      }
    } catch (error) {
      // Display exact error messages from the server
      const errorMsg = error.response?.data?.msg || error.message;
      alert('Error during login: ' + errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {isRegistering ? (
        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}
      <p>
        {isRegistering ? 'Already have an account? ' : 'Don\'t have an account? '}
        <button onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default Auth;
