import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <Container
      className="dashboard"
      style={{ height: window.outerHeight }}
      fluid
    >
      <Row className="dashboard__container">
        <Col className="dashboard__container__col">
          
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
