import { useContext } from "react";
import { useForm } from "react-hook-form";
import authService from "../../services/auth";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormGroup from "../../components/FormGroup/FormGroup";
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import signupJsonSchemaForm from "../../schemas/signupJsonSchemaForm";
import "./Signup.css";

export const Signup = () => {
  const { signin } = useContext(AuthContext);
  let navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    isConfirmCode: false,
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formSchema, setFormSchema] = useState([]);
  const { handleSubmit, control } = useForm();

  useEffect(() => {
    const schemaProperties = Object.keys(signupJsonSchemaForm.fields).map(
      (key) => signupJsonSchemaForm.fields[key]
    );

    setFormSchema(
      schemaProperties.filter(({ name }) => {
        if (user.username && user.email && !user.isConfirmCode && !isLoading) {
          return name === "confirmCode";
        }
        if (user.isConfirmCode && !isLoading) {
          return name === "password";
        }
        return !isLoading ? name === "username" || name === "email" : "";
      })
    );
  }, [user.username, user.email, user.password, user.isConfirmCode, isLoading]);

  const onSubmit = (data) => {
    const { username, email, password, confirmCode } = data;
    if (email && username && !confirmCode) {
      setIsLoading(true);
      authService
        .handleEmail(email, username)
        .then((res) => res)
        .then((r) => {
          setIsLoading(false);
          setUser({
            ...user,
            username: r.user.username,
            email: r.user.email,
          });
          setMessage(r.message);
        })
        .catch((err) => {
          setIsLoading(false);
          setMessage(err.message);
        });
    }

    if (confirmCode && !password) {
      setIsLoading(true);
      authService
        .handleConfirmCode(email, confirmCode)
        .then((res) => res)
        .then((r) => {
          setIsLoading(false);
          setMessage(r.message);
          setUser({
            ...user,
            isConfirmCode: r.isValidCode,
          });
        })
        .catch((err) => {
          setIsLoading(false);
          setMessage(err.message);
        });
    }

    if (password) {
      setIsLoading(true);
      authService
        .handleUserPaswword(email, password)
        .then((res) => res)
        .then((r) => {
          setIsLoading(false);
          setMessage(r.message);
          signin(r.user, r.token);
          navigate("/dashboard", { replace: true });
        })
        .catch((err) => {
          setIsLoading(false);
          setMessage(err.message);
        });
    }
  };

  return (
    <Container
      className="signup-container bg-primary"
      style={{ height: window.outerHeight }}
      fluid
    >
      <Row className="signup-row">
        <Col className="signup-col m-auto" md={3}>
          <Form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            <h2 className="signup-form-title">
              {!user.username
                ? "Inscription"
                : !user.isConfirmCode
                ? "Tu y es presque."
                : "Un dernier petit pas !"}
            </h2>
            <div className="signup-form-headline">
              {!isLoading ? (
                !message ? (
                  "Bienvenue sur Wish"
                ) : (
                  message
                )
              ) : (
                <>
                  <Form.Group className="signup-form-spinner">
                    <Spinner animation="border" variant="primary" size="lg" />
                  </Form.Group>
                </>
              )}
            </div>
            <FormGroup schema={formSchema} control={control} />
            <Form.Group className="signup-form-group">
              <Button
                className="signup-form-button"
                variant="primary"
                size="lg"
                type="submit"
              >
                {!user.username
                  ? "Inscription"
                  : !user.confirmCode
                  ? "Confirmer"
                  : "C'est partie !"}
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
