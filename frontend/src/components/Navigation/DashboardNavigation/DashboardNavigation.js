import React from "react";
import Nav from "react-bootstrap/Nav";

const DashboardNavigation = () => {
  return (
    <Nav variant="pills" className="justify-content-center">
      <Nav.Item>
        <Nav.Link className="display-4 text-dark m-4">Ma liste</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="display-4 text-dark m-4">Famille</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="display-4 text-dark m-4">Profile</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default DashboardNavigation;
