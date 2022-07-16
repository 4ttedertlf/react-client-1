import React from "react";
import { Footer } from "./footer";
import { Header } from "./header";
/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {


  return (
    <>
      <Header></Header>
      {props.children}
      <Footer />
    </>
  );
};
