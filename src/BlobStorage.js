import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Blob from "./Blob";
import Upload from "./Upload";
/**
 * All content is publicly available.
 */
export const BlobStorage = (props) => {
  return (
    <>
      <Container className="container-fluid d-grid gap-3 mt-5 mb-5" fluid>
        <Upload appConfig={global.appConfig} />
        <Blob />
      </Container>
    </>
  );
};
