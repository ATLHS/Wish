import React from "react";
import SignupForm from "../../components/Form/SignupForm/SignupForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import './Signup.css';

export const Signup = () => {
  return (
    <Container
      className="bg-primary"
      style={{ height: window.outerHeight }}
      fluid
    >
      <Row>
        <Col className="m-auto" md={3}>
          <SignupForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
