import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const TextareaField = ({
  field: { onChange, onBlur, value, name, ref },
  fieldState: { invalid, isTouched, isDirty, error },
  formState: { errors },
  type,
  label,
  placeholder,
}) => (
  <FloatingLabel controlId={label} label={label}>
    <Form.Control
      as="textarea"
      placeholder={placeholder}
      style={{ height: "100px" }}
      onChange={onChange}
    />
  </FloatingLabel>
);

export default TextareaField;
