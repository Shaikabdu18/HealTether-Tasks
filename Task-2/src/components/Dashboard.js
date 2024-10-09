import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import './Dashboard.css';

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dashboard-container">
      {isAuthenticated ? (
        <>
          <h2>Welcome, {user.email}!</h2>
          <button onClick={handleLogout} className="btn">Logout</button>
        </>
      ) : (
        <h2>Please log in to access the dashboard.</h2>
      )}
    </div>
  );
};

export default Dashboard;
