import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import logo from '../../../images/logo.png';
import './NavBar.css';
import { HashLink } from 'react-router-hash-link';
import useAuth from '../../../hooks/useAuth';

const NavBar = () => {
  const { users, logOut } = useAuth();
  return (
    <Navbar
      className="navbar-container"
      // bg="white"
      variant="dark"
      sticky="top"
      collapseOnSelect
      expand="lg"
    >
      <Container>
        <Navbar.Brand as={HashLink} className="" to="/">
          <img className="img-fluid logo" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link as={HashLink} to="/home">
            Home
          </Nav.Link>
          <Nav.Link as={HashLink} to="/explore">
            Explore
          </Nav.Link>
          {users.email && (
            <Nav.Link as={HashLink} to="/dashBoard">
              Dashboard
            </Nav.Link>
          )}
          <span className="text-white fw-bold">{users?.displayName}</span>
          {users?.email ? (
            <Button onClick={logOut} className="btn button ms-2">
              Logout
            </Button>
          ) : (
            <Nav.Link as={HashLink} to="/login">
              <Button className="btn button ms-2">Login</Button>
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
