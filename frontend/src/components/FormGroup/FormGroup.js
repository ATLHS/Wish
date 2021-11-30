import React from "react";
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormConstructor from "../FormConstructor/FormConstructor";
import Message from "../Message/Message";

const FormGroup = ({ schema, control }) => {
  return schema.map((field, i) => {
    return (
      <Controller
        key={i}
        control={control}
        name={field.label}
        render={(props) => (
          <>
            <FormConstructor events={props} field={field} />
            <ErrorMessage
              errors={props.formState.errors}
              name={field.label}
              render={({ message }) => <Message message={message} />}
            />
          </>
        )}
        rules={field.validation}
      />
    );
  });
};

export default FormGroup;
