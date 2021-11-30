import React from "react";
import Form from "react-bootstrap/Form";
import "./Message.css";

const Message = ({ message }) => (
  <Form.Text className="error-message" muted={false}>
    {message}
  </Form.Text>
);

export default Message;
