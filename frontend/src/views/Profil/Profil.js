import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Profil.css";

const Profil = () => {
  return (
    <Container
      className="bg-primary"
      style={{ height: window.innerHeight }}
      fluid
    >
      <Row className="h-100 d-flex justify-content-center">
        <Col xs={3} className="display-3">
          Profil
        </Col>
      </Row>
    </Container>
  );
};

export default Profil;
