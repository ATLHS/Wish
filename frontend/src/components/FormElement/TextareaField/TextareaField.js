import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "./TextareaField.css";

const TextareaField = ({
  field: { onChange, onBlur, value, name, ref },
  fieldState: { invalid, isTouched, isDirty, error },
  formState: { errors },
  type,
  label,
  placeholder,
}) => (
  <FloatingLabel className="textarea-field" controlId={label} label={label}>
    <Form.Control
      className="textarea-field-input"
      as="textarea"
      placeholder={placeholder}
      onChange={onChange}
    />
  </FloatingLabel>
);

export default TextareaField;
