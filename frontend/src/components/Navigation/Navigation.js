import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  let navigate = useNavigate();

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
              {isLoggedIn && (
                <Link
                  className="nav-link"
                  to="/dashboard"
                  onClick={() => setExpanded(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link
                className="nav-link"
                to={!isLoggedIn ? "/signup" : "/profil"}
                onClick={() => setExpanded(false)}
              >
                {!isLoggedIn ? "Inscription" : "Profil"}
              </Link>

              <Link
                className="nav-link"
                to="/signin"
                onClick={
                  !isLoggedIn
                    ? () => setExpanded(false)
                    : () => {
                        logout();
                        navigate("/signin", { replace: true });
                        setExpanded(false);
                      }
                }
              >
                {!isLoggedIn ? "Connexion" : "Déconnexion"}
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navigation;
