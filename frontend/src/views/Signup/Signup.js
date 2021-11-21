import React from "react";
import WishForm from "../../components/WishForm/WishForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import './Signup.css';

export const Signup = () => {
  return (
    <Container
      className="bg-primary"
      style={{ height: window.innerHeight }}
      fluid
    >
      <Row className="h-100 d-flex justify-content-center">
        <Col xs={3}>
          <WishForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
