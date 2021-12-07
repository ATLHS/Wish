// import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { AuthContext } from "../../context/AuthContext";
import "./Dashboard.css";

export const Dashboard = () => {
  //   const { isLoggedIn } = useContext(AuthContext);
  return (
    <Container
      className="bg-primary"
      style={{ height: window.innerHeight }}
      fluid
    >
      <Row className="h-100 d-flex justify-content-center">
        <Col xs={3} className="display-3">
          Dashboard
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
