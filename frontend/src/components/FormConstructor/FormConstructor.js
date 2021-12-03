import React from "react";
import InputField from "../FormElement/InputField/InputField";
import TextareaField from "../FormElement/TextareaField/TextareaField";

const FormConstructor = ({ events, field }) => {
  switch (field.type) {
    case "text":
      return <InputField {...events} {...field} />;
    case "textarea":
      return <TextareaField {...events} {...field} />;
    case "email":
      return <InputField {...events} {...field} />;
    default:
      return;
  }
};

export default FormConstructor;
