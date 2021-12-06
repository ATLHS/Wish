import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AuthContext } from "../../Context/AuthContext";
// import './Home.css';

export const Home = () => {
  const context = useContext(AuthContext);
  return (
    <Container
      className="bg-primary"
      style={{ height: window.innerHeight }}
      fluid
    >
      <Row className="h-100 d-flex justify-content-center">
        <Col xs={3}></Col>
      </Row>
    </Container>
  );
};

export default Home;
