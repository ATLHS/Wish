import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import authService from "../../services/auth";
import { useForm } from "react-hook-form";
import loginJsonSchemaForm from "../../schemas/loginJsonSchemaForm";
import FormGroup from "../../components/FormGroup/FormGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

const Login = () => {
  // const [message, setMessage] = useState("");
  const { handleSubmit, control } = useForm();
  const onSubmit = (data, e) => {
    console.log(data, "data");
    e.preventDefault();

    const { email, password } = data;

    if (email && password) {
      // setIsLoading(true);
      authService
        .handleLogin(email, password)
        .then((res) => res)
        .then((r) => {
          // setMessage(r.message);
          // setIsLoading(false);
          console.log(r);
        })
        .catch((err) => {
          return;
          // setMessage(err.message);
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
          <Form onSubmit={handleSubmit(onSubmit)} className="loginform">
            {/* <h2 className="login-title">Connexion</h2>
            <p className="loginform-headline">
              {!isLoading ? (
                !message ? (
                  "Indiquez votre e-mail et votre mot de pass pour commencer"
                ) : (
                  message
                )
              ) : (
                <div></div>
              )}
            </p> */}

            <FormGroup schema={schemaProperties} control={control} />
            <Form.Group className="loginform-group">
              <Button
                className="loginform-button"
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
