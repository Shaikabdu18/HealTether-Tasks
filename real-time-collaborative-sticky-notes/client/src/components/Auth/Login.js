// client/src/components/Auth/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper,
  Link 
} from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(res.data.token);
      navigate('/board');
    } catch (err) {
      setError(err.response?.data?.msg || 'An error occurred during login');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 'calc(100vh - 64px)' 
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 400, 
          width: '100%',
          mx: 2
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        
        {error && (
          <Typography 
            color="error" 
            variant="body2" 
            align="center" 
            sx={{ mb: 2 }}
          >
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
            autoFocus
            autoComplete="username"
          />
          
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link 
                component="button"
                variant="body2"
                onClick={() => navigate('/register')}
              >
                Register here
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;