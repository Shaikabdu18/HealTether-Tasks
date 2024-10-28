import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Board from './components/Board/Board';
import Navbar from './components/Layout/Navbar';
import { useAuth } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/board"
          element={
            <PrivateRoute>
              <Board />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/board" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
