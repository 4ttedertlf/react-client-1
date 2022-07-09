import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./button-sign-in";
import { SignOutButton } from "./button-sign-out";
import { Container, Row, Col } from "react-bootstrap";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <Container fluid>
        <Row>
        <Col>Add nav elements here</Col>
          <Col xs={8}>
            <center>4tt</center>
          </Col >
          
          <Col >{isAuthenticated ? <SignOutButton /> : <SignInButton />}</Col>
        </Row>
      </Container>
      {props.children}
    </>
  );
};
