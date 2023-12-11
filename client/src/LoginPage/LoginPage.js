import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();

        if (userData.accessToken) {
          // Call handleToken to set the token and expiration time in local storage
          handleToken(userData.accessToken);

          const decodedToken = decodeToken(userData.accessToken);

          if (decodedToken && decodedToken.userId) {
            const userId = decodedToken.userId;
            const firstname = userData.firstname;

            localStorage.setItem('userId', userId);
            localStorage.setItem('firstname', firstname);

            navigate('/homepage');
          } else {
            console.error('User ID not found in decoded token:', decodedToken);
            toast.error('Invalid login credentials', {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        } else {
          console.error('Access token not found in server response:', userData);
        }
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  const handleToken = (token) => {
    // Set the token in local storage
    localStorage.setItem("token", token);
  
    // Set the expiration time (e.g., 1 minute from now)
const expirationTime = new Date().getTime() + 60 * 1000; // 1 minute

    localStorage.setItem("tokenExpiration", expirationTime);
  };
  
  const decodeToken = (token) => {
    try {
      const decodedString = atob(token.split('.')[1]);
      const decodedObject = JSON.parse(decodedString);
      return decodedObject;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login Page</h2>
      <form style={styles.form}>
        <label style={styles.label}>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </label>
        <br />
        <label style={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            style={styles.input}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin} style={styles.button}>
          Login
        </button>
        <ToastContainer />
      </form>
      <Link to="/register" style={styles.registerButton}>
        If new user ? Register
      </Link>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    boxShadow: '0 5px 10px rgba(0,0,0,0.2)',
    backgroundColor: '#f5f5f5', // Light gray background color
    borderRadius: '8px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '10px',
  },
  input: {
    height: '40px',
    width: '100%',
    outline: 'none',
    border: 'none',
    padding: '0 10px',
    fontSize: '16px',
    fontWeight: '500',
    borderBottom: '2px solid rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
  },
  button: {
    marginTop: '20px',
    color: '#fff',
    backgroundColor: '#7d2ae8', // Purple button color
    borderRadius: '6px',
    padding: '10px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    border: 'none',
    outline: 'none',
  },
  registerButton: {
    display: 'block',
    marginTop: '10px',
    color: '#5b13b9',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    fontWeight: '500',
    transition: 'color 0.4s ease',
  },
};

export default LoginPage;
