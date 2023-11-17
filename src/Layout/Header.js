import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import CustomModal from '../modal';
import LoginModal from '../LoginModal'
import { useAuth } from '../Login/Auth'
import users from '../Login/users.json'

const Header = () => {
  const { authenticated, logout } = useAuth();
  const [showModal, setShowModal] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [loggedInUserName, setLoggedInUserName] = React.useState(null);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleLoginModalShow = () => setShowLoginModal(true);
  const handleLoginModalClose = () => setShowLoginModal(false);

  const handleLogin = (user) => {
    setLoggedInUserName(user.name);
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className="custom-bg-light-blue">
        <Container>
          <Navbar.Brand href="./main"
            style={{ fontFamily: 'Akzidenz-grotesk-bold', fontWeight: 'bold', fontSize: '28px', color: '#000000' }}
          >Hansung Computer</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} onClick={handleModalShow}>
                TODOLIST
              </Nav.Link>
              {authenticated ? (
                <Nav.Link>
                  {loggedInUserName ? `${loggedInUserName}님` : null}
                </Nav.Link>
              ) : (
                <Nav.Link eventKey={3} onClick={handleLoginModalShow}>
                  Login
                </Nav.Link>
              )}
              {authenticated && (
                <Nav.Link eventKey={4} onClick={logout}>
                  Logout
                </Nav.Link>
              )}
              <CustomModal showModal={showModal} handleModalClose={handleModalClose} />
              <LoginModal
                showLoginModal={showLoginModal}
                handleLoginModalClose={handleLoginModalClose}
                handleLogin={handleLogin}
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
