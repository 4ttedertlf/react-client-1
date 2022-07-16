import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import { SignInButton } from "./button-sign-in";
import { SignOutButton } from "./button-sign-out";
import { useIsAuthenticated } from "@azure/msal-react";
/**
 * All content is publicly available. 
 */
export const Header = () => {
    const isAuthenticated = useIsAuthenticated();
  return (
    <>
      <Container className="container-fluid bg-secondary text-white" fluid>
        <Row className="align-items-center text-start">
        <Col className="col-sm-1 gap-3 text-uppercase">4tt</Col>
        <Col className="gap-3">All Azure</Col>
          <Col className="text-end">
            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
          </Col>
        </Row>
      </Container>
    </>
  );
};
