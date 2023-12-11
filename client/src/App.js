import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import Menu from './Menu/Menu';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import UserManual from './UserManual/UserManual';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import ConfigurePage from './ConfigurePage/ConfigurePage';
import EnterUsedBudget from './EnterUsedBudget/EnterUsedBudget';
function App() {
  return (
    <Router>
      <Menu />
      <div className="mainContainer">
        <Routes>
          <Route path="/usermanual" element={<UserManual />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/configure" element={<ConfigurePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/enterusedbudget" element={<EnterUsedBudget />} />
          <Route
            path="/"
            element={<Navigate to="/login" />} // Update this based on your authentication logic
          />
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
