import { useContext } from "react";
import { useForm } from "react-hook-form";
import authService from "../../services/auth";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormGroup from "../../components/FormGroup/FormGroup";
import signInJsonSchemaForm from "../../schemas/signInJsonSchemaForm";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const { state } = useLocation();
  const { signin } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    const { email, password } = data;

    if (email && password) {
      setIsLoading(true);
      authService
        .handleSignIn(email, password)
        .then((res) => res)
        .then((r) => {
          setIsLoading(false);
          setMessage(r.message);
          signin(r.user, r.token);
          navigate(state.prevPath || "/dashboard", { replace: true });
        })
        .catch((err) => {
          setIsLoading(false);
          setMessage(err.message);
        });
    }
  };

  const schemaProperties = Object.keys(signInJsonSchemaForm.fields).map(
    (key) => signInJsonSchemaForm.fields[key]
  );

  return (
    <Container
      className="signin-container bg-primary"
      style={{ height: window.outerHeight }}
      fluid
    >
      <Row className="signin-row">
        <Col className="signin-col m-auto" xs={3}>
          <Form onSubmit={handleSubmit(onSubmit)} className="signin-form">
            <h2 className="signin-form-title">Connexion</h2>
            <div className="signin-form-headline">
              {!isLoading ? (
                !message ? (
                  "Bienvenue sur Wish"
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
            <Form.Group className="signin-form-group">
              <Button
                className="signin-form-button"
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

export default SignIn;
