import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import loginImage from '../../images/login.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
const Register = () => {
  const [loginData, setLoginData] = useState({});
  const {
    user,
    registerUserByEmail,
    isLoading,
    error,
    setError,
    signInWithGoogle,
  } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const handleOnBlur = e => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = e => {
    if (loginData.password !== loginData.password2) {
      setError('Your password did not match');
      e.preventDefault();
      return;
    }
    registerUserByEmail(
      loginData.email,
      loginData.password,
      loginData.name,
      history,
      location
    );
    e.preventDefault();
  };
  return (
    <Container className="login-container">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div>
            <i className="far fa-user login-icon"></i>
            <h4 className="fw-bold login-title">Register</h4>
          </div>
          {!isLoading && (
            <>
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  sx={{ width: '75%', m: 1 }}
                  id="standard-basic"
                  name="name"
                  type="text"
                  label="Your name"
                  variant="standard"
                  onBlur={handleOnBlur}
                />
                <TextField
                  sx={{ width: '75%', m: 1 }}
                  id="standard-basic"
                  name="email"
                  type="email"
                  label="Your email"
                  variant="standard"
                  onBlur={handleOnBlur}
                />
                <TextField
                  sx={{ width: '75%', m: 1 }}
                  id="standard-basic"
                  label="Your Password"
                  name="password"
                  onBlur={handleOnBlur}
                  type="password"
                  variant="standard"
                />
                <TextField
                  sx={{ width: '75%', m: 1 }}
                  id="standard-basic"
                  label="ReType Your Password"
                  name="password2"
                  onBlur={handleOnBlur}
                  type="password"
                  variant="standard"
                />
                {user?.email && (
                  <Alert
                    sx={{ backgroundColor: 'white', width: '75%', ml: 6 }}
                    severity="success"
                  >
                    Register Successfully
                  </Alert>
                )}
                {error && (
                  <Alert
                    sx={{ backgroundColor: 'white', width: '75%', ml: 6 }}
                    severity="error"
                  >
                    {error}
                  </Alert>
                )}
                <Button
                  sx={{ width: '75%', m: 1 }}
                  type="submit"
                  variant="contained"
                  className="login-btn"
                >
                  Register
                </Button>
              </form>
              <Link to="/login">
                <Button style={{ marginBottom: '10px' }} variant="text">
                  ALREADY HAVE ACCOUNT? PLEASE LOGIN
                </Button>
              </Link>
              <br />
              <Button
                onClick={() => {
                  signInWithGoogle(location, history);
                }}
                variant="contained"
                className="login-btn"
              >
                Google login
              </Button>
            </>
          )}
          {isLoading && <CircularProgress />}
        </Grid>
        <Grid item xs={12} md={6}>
          <img src={loginImage} alt="" style={{ width: '100%' }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
