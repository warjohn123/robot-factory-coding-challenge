import React, { useEffect } from "react";
import { Card, Container, Nav, Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Robot Factory</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#home">Quality Assurance</Nav.Link> */}
            {/* <Nav.Link href="#link">Shipment</Nav.Link> */}
            {/* <Link to="/quality-assurance">Quality Assurance</Link>
            <Link to="/quality-assurance">Shipment</Link> */}
            <NavItem>
              <Nav.Link as={Link} to="/quality-assurance">
                Quality Assurance
              </Nav.Link>
            </NavItem>
            <NavItem>
              <Nav.Link as={Link} to="/shipping">
                Shipping
              </Nav.Link>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
