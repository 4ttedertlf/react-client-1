import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/authConfig";
import Button from "react-bootstrap/Button";

function handleLogin(instance) {
  instance.loginPopup(loginRequest).catch((e) => {
    console.error(e);
  });
}

/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  return (
    <div >
      <Button
        type="button"
        className="btn btn-primary"
        onClick={() => handleLogin(instance)}
      >
        Sign in
      </Button>
    </div>
  );
};
