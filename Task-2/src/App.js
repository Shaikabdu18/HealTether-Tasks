// src/App.js
import React from 'react';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      <h1>Redux-React Authentication</h1>
      {isAuthenticated ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;
