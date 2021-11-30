import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const InputField = ({
  field: { onChange, onBlur, value, name, ref },
  fieldState: { invalid, isTouched, isDirty, error },
  formState: { errors },
  type,
  label,
  placeholder,
}) => (
  <FloatingLabel style={{ margin: "10px" }} controlId={label} label={label}>
    <Form.Control onChange={onChange} type={type} placeholder={placeholder} />
  </FloatingLabel>
);

export default InputField;
