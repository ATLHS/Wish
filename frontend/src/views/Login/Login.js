import { useForm } from "react-hook-form";
import authService from "../../services/auth";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormGroup from "../../components/FormGroup/FormGroup";
import loginJsonSchemaForm from "../../schemas/loginJsonSchemaForm";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import "./Login.css";

const Login = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control } = useForm();
  const onSubmit = (data, e) => {
    const { email, password } = data;

    if (email && password) {
      setIsLoading(true);
      authService
        .handleLogin(email, password)
        .then((res) => res)
        .then((r) => {
          setMessage(r.message);
          setIsLoading(false);
        })
        .catch((err) => {
          setMessage(err.message);
        });
    }
  };

  const schemaProperties = Object.keys(loginJsonSchemaForm.fields).map(
    (key) => loginJsonSchemaForm.fields[key]
  );

  return (
    <Container
      className="login-container bg-primary"
      style={{ height: window.outerHeight }}
      fluid
    >
      <Row className="login-row">
        <Col className="login-col m-auto" xs={3}>
          <Form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <h2 className="login-form-title">Connexion</h2>
            <div className="login-form-headline">
              {!isLoading ? (
                !message ? (
                  "Indiquez votre e-mail et votre mot de pass pour commencer"
                ) : (
                  message
                )
              ) : (
                <Form.Group className="wishform-group">
                  <Spinner animation="border" variant="primary" size="lg" />
                </Form.Group>
              )}
            </div>
            <FormGroup schema={schemaProperties} control={control} />
            <Form.Group className="login-form-group">
              <Button
                className="login-form-button"
                variant="primary"
                size="lg"
                type="submit"
              >
                Connexion
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
