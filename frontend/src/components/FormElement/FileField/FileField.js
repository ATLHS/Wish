import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import "./FileField.scss";

const FileField = ({
  field: { onChange, onBlur, value, name, ref },
  fieldState: { invalid, isTouched, isDirty, error },
  formState: { errors },
  type,
  label,
  placeholder,
}) => {
  const [image, setImage] = useState(false);
  const fileInput = useRef();
  const selectInput = () => fileInput.current.click();

  const getImagePreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setImage(reader.result);
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <Row className="file-field">
      <Col onClick={selectInput} className="file-field__image">
        <Image
          src={image ? image : placeholder}
          rounded
          className={`file-field__image__placeholder ${!image && "b-dashed"}`}
        />
      </Col>
      <Form.Group controlId={label} className="file-field__group">
        <Form.Control
          ref={fileInput}
          type={type}
          onChange={(e) => {
            onChange(e.target.files[0]);
            getImagePreview(e);
          }}
          className="file-field__group__control"
        />
      </Form.Group>
    </Row>
  );
};

export default FileField;
