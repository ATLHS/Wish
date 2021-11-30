import React from "react";
import InputField from "../FormElement/InputField";
import TextareaField from "../FormElement/TextareaField";

const FormConstructor = ({ events, field }) => {
  switch (field.type) {
    case "text":
      return <InputField {...events} {...field} />;
    case "textarea":
      return <TextareaField {...events} {...field} />;
    default:
      return;
  }
};

export default FormConstructor;
