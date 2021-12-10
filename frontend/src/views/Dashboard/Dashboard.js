import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <Container
      className="dashboard-container"
      style={{ height: window.innerHeight }}
      fluid
    >
      <Row className="dashboard-row">
        <Col className="dashboard-col m-auto" md={3}>
          <Nav className="dashboard-nav">
            <Nav.Item>
              <Nav.Link href="/home">Membres</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">Ma liste</Nav.Link>
            </Nav.Item>
          </Nav>
          <Row className="dashboard-row_members">
            <Col className="dashboard-row_members_profil-col">
              <Image
                className="dashboard-row_members_profil-pictures"
                style={{ height: "150px", width: "150px" }}
                src="https://images.squarespace-cdn.com/content/v1/5446f93de4b0a3452dfaf5b0/1626904421257-T6I5V5IQ4GI2SJ8EU82M/Above+Avalon+Neil+Cybart"
                rounded
              />
            </Col>
            <Col className="dashboard-row_members_profil-col">
              <Image
                className="dashboard-row_members_profil-pictures"
                src="https://images.squarespace-cdn.com/content/v1/5446f93de4b0a3452dfaf5b0/1626904421257-T6I5V5IQ4GI2SJ8EU82M/Above+Avalon+Neil+Cybart"
                rounded
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
