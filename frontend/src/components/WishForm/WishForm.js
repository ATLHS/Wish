import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import userService from "../../services/user/user";
import "./WishForm.css";

const WishForm = () => {
  const [user, setUser] = useState({
    user: { firstname: "", userEmail: "" },
  });
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setValidated(false);

    const {
      user: { firstname, userEmail },
    } = user;

    if (email && username && !confirmCode) {
      setIsLoading(true);
      userService
        .handleEmail(email, username)
        .then((res) => res)
        .then((r) => {
          setUser({
            ...user,
            user: { firstname: r.user.firstname, userEmail: r.user.email },
          });
          setMessage(r.message);
          setIsLoading(false);
        });
    }

    if (firstname && confirmCode) {
      setIsLoading(true);
      userService
        .handleConfirmCode(userEmail, confirmCode)
        .then((res) => res)
        .then((r) => {
          setIsLoading(false);
          setMessage(r.message);
          console.log(r);
        });
    }
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="wishform"
    >
      <h2 className="wishform-title">
        {!user.user.firstname
          ? "Bienvenue sur Wish."
          : `Hello ${user.user.firstname} !`}
      </h2>
      <p className="wishform-headline">
        {!message ? "Indiquez votre e-mail pour commencer" : message}
      </p>
      {!isLoading ? (
        !user.user.firstname ? (
          <>
            <Form.Group
              className="wishform-group"
              controlId="formGroupUsername"
            >
              <Form.Control
                required
                type="text"
                placeholder="ex. mila"
                onChange={(e) => setUsername(e.target.value)}
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                Indiquez un prénom 🙏.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="wishform-group" controlId="formGroupEmail">
              <Form.Control
                required
                type="email"
                placeholder="ex. mila@hotmail.com"
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                Indiquez une adresse email 🙏.
              </Form.Control.Feedback>
            </Form.Group>
          </>
        ) : (
          <div></div>
        )
      ) : (
        <Form.Group className="wishform-group">
          <Spinner animation="border" variant="primary" size="lg" />
        </Form.Group>
      )}
      {user.user.firstname ? (
        <Form.Group className="wishform-group" controlId="formGroupFirstCode">
          <Form.Control
            required
            type="text"
            placeholder="ex. 12345"
            onChange={(e) => setConfirmCode(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Indiquez le code envoyer dans votre adresse email 🙏.
          </Form.Control.Feedback>
        </Form.Group>
      ) : (
        <div></div>
      )}
      <Form.Group className="wishform-group">
        <Button
          className="wishform-button"
          variant="primary"
          size="lg"
          type="submit"
        >
          {!user.user.firstname ? "Confirmer" : "C'est partie !"}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default WishForm;
