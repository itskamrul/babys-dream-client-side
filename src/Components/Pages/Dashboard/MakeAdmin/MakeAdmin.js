import React, { useState } from 'react';
import { Button, TextField, Alert } from '@mui/material';

const MakeAdmin = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleOnBlur = e => {
    setEmail(e.target.value);
  };
  const handleAdminSubmit = e => {
    const user = { email };
    fetch('http://localhost:5000/users/admin', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          setSuccess(true);
        }
      });

    e.preventDefault();
  };
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Make an Admin</h2>
      <form onSubmit={handleAdminSubmit}>
        <TextField
          sx={{ width: '50%' }}
          label="Email"
          type="email"
          onBlur={handleOnBlur}
          variant="standard"
        />
        <Button className="login-btn" type="submit" variant="contained">
          Make Admin
        </Button>
      </form>
      {success && (
        <Alert contained sx={{ justifyContent: 'center' }} severity="success">
          Made Admin successfully!
        </Alert>
      )}
    </div>
  );
};

export default MakeAdmin;
