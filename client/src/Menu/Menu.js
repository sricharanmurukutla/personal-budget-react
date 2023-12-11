import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Menu.css'; // Import the CSS file
import axios from 'axios';
import styled from 'styled-components';

const CustomNavBar = styled.nav`
  color: white;
`;



function Menu() {
  const [userId, setUserId] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const value = localStorage.getItem('userId');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUserId(value || '');

    // Fetch user details when userId is available
    if (value) {
      // Replace the following API call with your actual API endpoint to fetch user details
      fetchUserDetails(value);
    }
  }, [value]);

  

  const fetchUserDetails = async (userId) => {
    try {
      // Replace the following with your actual API endpoint to fetch user details
      const response = await axios.get(`http://localhost:${3000}/api/users/${userId}`);
      const userData = response.data;
  
      // Assuming the API response has a "firstname" property
      setUserFirstName(userData.firstname);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };
  
  

  const handleLogout = () => {
    localStorage.clear();
    setUserId('');
    setUserFirstName('');
    navigate('/');
    location.reload();
  };

  return (
    <CustomNavBar className="menu" aria-label="Main menu" itemScope itemType="https://schema.org/SiteNavigationElement">
      <ul>
        {!userId ? (
          <>
            <li><Link itemProp="url" to="/login" tabIndex="5">Login</Link></li>
            <li><Link itemProp="url" to="/register" tabIndex="6">Register</Link></li>
          </>
        ) : (
          <>
            <li><span>Welcome, {userFirstName}!</span></li>
            <li><Link itemProp="url" to="/usermanual" tabIndex="2">User Manual</Link></li>
            <li><Link itemProp="url" to="/homepage" tabIndex="3">HomePage</Link></li>
            <li><Link itemProp="url" to="/enterusedbudget" tabIndex="2">Used Budget</Link></li>
            <li><Link itemProp="url" to="/" tabIndex="11" onClick={handleLogout}>Logout</Link></li>
            <li><span>Welcome, {userFirstName}!</span></li>
          </>
        )}
      </ul>
    </CustomNavBar>
  );
}

export default Menu;
