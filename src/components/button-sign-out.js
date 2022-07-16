import React from "react";
import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

function handleLogout(instance) {
  instance.logoutPopup().catch((e) => {
    console.error(e);
  });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
  const { accounts } = useMsal();
  const name = accounts[0] && accounts[0].name;
  const userName = accounts[0] && accounts[0].username;

  console.log(accounts[0]);

  const { instance } = useMsal();

  return (
    <div className="d-flex align-items-center float-end gap-3">
      <div>
        <div>{name ? name : null}</div>
        <div> {userName ? userName : null}</div>
      </div>
      <div>
        <Button
          type="button"
          className="btn btn-primary"
          onClick={() => handleLogout(instance)}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};
