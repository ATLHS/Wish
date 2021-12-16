import React from "react";
import InputField from "../FormElement/InputField/InputField";
import TextareaField from "../FormElement/TextareaField/TextareaField";
import FileField from "../FormElement/FileField/FileField";

const FormConstructor = ({ events, field }) => {
  switch (field.type) {
    case "text":
      return <InputField {...events} {...field} />;
    case "password":
      return <InputField {...events} {...field} />;
    case "textarea":
      return <TextareaField {...events} {...field} />;
    case "email":
      return <InputField {...events} {...field} />;
    case "file":
      return <FileField {...events} {...field} />;
    default:
      return;
  }
};

export default FormConstructor;
