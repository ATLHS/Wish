import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const Field = ({
  field: { onChange, onBlur, value, name, ref },
  fieldState: { invalid, isTouched, isDirty, error },
  formState: { errors },
  type,
  label,
  placeholder,
}) => {
  switch (type) {
    case "text":
      return (
        <FloatingLabel
          style={{ margin: "10px" }}
          controlId={label}
          label={label}
        >
          <Form.Control
            onChange={onChange}
            type={type}
            placeholder={placeholder}
          />
        </FloatingLabel>
      );
    case "textarea":
      return (
        <FloatingLabel controlId={label} label={label}>
          <Form.Control
            as="textarea"
            placeholder={placeholder}
            style={{ height: "100px" }}
            onChange={onChange}
          />
        </FloatingLabel>
      );

    default:
      return;
  }
};

export default Field;
