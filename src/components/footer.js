import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import { PublicStaticContent } from "./public-static-content";
/**
 * All content is publicly available. 
 */
export const Footer = (props) => {

  return (
    <>
      <Container className="container-fluid bg-secondary text-white" fluid>
        <Row className="text-center center-block">
          <Col><PublicStaticContent  contentName="Cookies" htmlContent="Cookies"/></Col>
          <Col><PublicStaticContent contentName="Privacy" htmlContent="Privacy policy"/></Col>
          <Col><PublicStaticContent contentName="Contact" htmlContent="Contact"/></Col>
       
       
       
       </Row>
       <Row><Col></Col></Row>
      </Container>
      {props.children}
    </>
  );
};
