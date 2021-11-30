import React from "react";
import Form from "react-bootstrap/Form";
import "./MessageHelper.css";

const MessageHelper = ({ message }) => (
  <Form.Text className="error-message" muted={false}>
    {message}
  </Form.Text>
);

export default MessageHelper;
