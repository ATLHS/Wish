import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export const Dashboard = () => {
  const members = [
    "Justine",
    "Sofiane",
    "Thibaud",
    "Arezou",
    "Bastien",
    "Ludivine",
    "Catherine",
    "Romain",
    "Francis",
  ];
  return (
    <Container className="" style={{ height: window.innerHeight }} fluid>
      <Row className="h-100 d-flex justify-content-center">
        <Col
          xs={7}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {members.map((member) => (
            <Card style={{ width: "15rem", height: "15rem", margin: "20px" }}>
              <Card.Img
                variant="top"
                src="https://www.pngitem.com/pimgs/m/645-6452863_profile-image-memoji-brown-hair-man-with-glasses.png"
              />
              <Card.Body>
                <Card.Title className="text-center">{member}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
