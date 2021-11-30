import React from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Field from "../Field/Field";
// import "./LoginForm.css";

const FormElement = ({ schema, control }) => {
  return schema.map((field, i) => {
    return (
      <Controller
        key={i}
        control={control}
        name={field.label}
        render={(props) => (
          <>
            <Field {...props} {...field} />
            <ErrorMessage
              errors={props.formState.errors}
              name={field.label}
              render={({ message }) => (
                <p style={{ margin: "10px", marginTop: "0", color: "red" }}>
                  {message}
                </p>
              )}
            />
          </>
        )}
        rules={field.validation}
      />
    );
  });
};

export default FormElement;
