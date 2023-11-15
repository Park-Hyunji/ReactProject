import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import CustomModal from '../modal'; 

const Header = () =>{
  const [showModal, setShowModal] = useState(false);

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
    return(
        <header>
            <Navbar collapseOnSelect expand="lg" className="custom-bg-light-blue">
        <Container>
          <Navbar.Brand href="./main" 
          style={{ fontFamily: 'Akzidenz-grotesk-bold', fontWeight: 'bold', fontSize: '28px', color: '#000000'}}
          >Hansung Computer</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="1학년" style={{ fontFamily: 'Akzidenz-grotesk-bold', fontWeight: 'bold', fontSize: '15px', color: 'black' }}
               id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/ComputerProgramming">컴퓨터프로그래밍</NavDropdown.Item>
                <NavDropdown.Item>웹프로그래밍</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="2학년" style={{ fontFamily: 'Akzidenz-grotesk-bold', fontWeight: 'bold', fontSize: '15px', color: 'black' }}
              id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/ProgrammingLab">프로그래밍랩</NavDropdown.Item>
              <NavDropdown.Item>객체지향언어1</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="3학년" style={{ fontFamily: 'Akzidenz-grotesk-bold', fontWeight: 'bold', fontSize: '15px', color: 'black' }}
            id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to ="/Web">웹프레임워크</NavDropdown.Item>
              <NavDropdown.Item>설계패턴</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="4학년" style={{ fontFamily: 'Akzidenz-grotesk-bold', fontWeight: 'bold', fontSize: '15px', color: 'black' }}
            id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to ="/Capstone">캡스톤디자인</NavDropdown.Item>
              <NavDropdown.Item>클라우드컴퓨팅</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} onClick={handleModalShow}>
                TODOLIST
              </Nav.Link>
              <CustomModal showModal={showModal} handleModalClose={handleModalClose} />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </header>
    )
}

export default Header;