import React from 'react';
import './App.css';
import axios from 'axios';
import Chart from 'chart.js/auto';



import {
  BrowserRouter as Router,
  Route,
  Routes, // Corrected import
} from "react-router-dom";
import axios from 'axios';
import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';
import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Menu />
      <Hero />
      <div className="mainContainer">
        <Routes> {/* Changed from <Switch> to <Routes> */}
          <Route path="/about" element={<AboutPage />} />,
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;