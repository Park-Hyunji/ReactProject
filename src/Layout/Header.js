import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import CustomModal from '../modal';
import LoginModal from '../LoginModal';
import { useAuth } from '../Login/Auth';
import users from '../Login/users.json';

const Header = () => {
  const { authenticated, login, logout } = useAuth();
  const [showModal, setShowModal] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [loggedInUserName, setLoggedInUserName] = React.useState(null);

  // Check for existing authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // You may want to validate the token and fetch user info here
      // For simplicity, I'm assuming a valid token means the user is authenticated
      login(); 
      setLoggedInUserName(localStorage.getItem('loggedInUserName'));
    }
  }, []);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const handleLoginModalShow = () => setShowLoginModal(true);
  const handleLoginModalClose = () => setShowLoginModal(false);

  const handleLogin = (user) => {
    setLoggedInUserName(user.name);
    localStorage.setItem('authToken', 'yourAuthToken'); 
    localStorage.setItem('loggedInUserName', user.name);
    login();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUserName');
    logout();
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
		<NavDropdown title="1학년" style={{ fontFamily: 'bori', fontWeight: 'bold', fontSize: '20px', color: 'black' }}
               id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/ComputerProgramming">컴퓨터프로그래밍</NavDropdown.Item>
                <NavDropdown.Item as= {Link} to ="/WebProgramming">웹프로그래밍</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="2학년" style={{ fontFamily: 'bori', fontWeight: 'bold', fontSize: '20px', color: 'black' }}
              id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/ProgrammingLab">프로그래밍랩</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Object">객체지향언어1</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="3학년" style={{ fontFamily: 'bori', fontWeight: 'bold', fontSize: '20px', color: 'black' }}
            id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to ="/Web">웹프레임워크</NavDropdown.Item>
              <NavDropdown.Item as={Link} to ="/Pattern">설계패턴</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="4학년" style={{ fontFamily: 'bori', fontWeight: 'bold', fontSize: '20px', color: 'black' }}
            id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to ="/Capstone">캡스톤디자인</NavDropdown.Item>
              <NavDropdown.Item as={Link} to ="/Cloud">클라우드컴퓨팅</NavDropdown.Item>
              </NavDropdown>
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
                <Nav.Link eventKey={4} onClick={handleLogout}>
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
