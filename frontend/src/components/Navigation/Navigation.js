import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar
      bg="light"
      expand={false}
      expanded={expanded}
      onToggle={() => expanded && setExpanded(false)}
    >
      <Container fluid>
        <Navbar.Brand href="#">Wish</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={() => setExpanded(true)}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton onClick={() => setExpanded(false)}>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="me-auto">
              <Link
                className="nav-link"
                to="/signin"
                onClick={() => setExpanded(false)}
              >
                Connexion
              </Link>
              <Link
                className="nav-link"
                to="/signup"
                onClick={() => setExpanded(false)}
              >
                Inscription
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navigation;
