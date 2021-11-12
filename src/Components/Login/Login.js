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
import './Login.css';

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const { user, loginUserByEmail, isLoading, error, signInWithGoogle } =
    useAuth();
  const history = useHistory();
  const location = useLocation();
  const handleOnChange = e => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleLoginSubmit = e => {
    loginUserByEmail(loginData.email, loginData.password, history, location);
    e.preventDefault();
  };
  return (
    <Container className="login-container">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div>
            <i className="far fa-user login-icon"></i>
            <h4 className="fw-bold login-title">Login</h4>
          </div>
          {!isLoading && (
            <>
              <form onSubmit={handleLoginSubmit}>
                <TextField
                  sx={{ width: '75%', m: 1 }}
                  id="standard-basic"
                  name="email"
                  type="email"
                  label="Your email"
                  variant="standard"
                  onChange={handleOnChange}
                />
                <TextField
                  sx={{ width: '75%', m: 1 }}
                  id="standard-basic"
                  label="Your Password"
                  name="password"
                  onChange={handleOnChange}
                  type="password"
                  variant="standard"
                />
                {user?.email && (
                  <Alert
                    sx={{ backgroundColor: 'white', width: '75%', ml: 6 }}
                    severity="success"
                  >
                    Login Successfully
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
                  Login
                </Button>
              </form>
              <Link style={{ textDecoration: 'none' }} to="/register">
                <Button variant="text">NEW USER? PLEASE REGISTER</Button>
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

export default Login;
