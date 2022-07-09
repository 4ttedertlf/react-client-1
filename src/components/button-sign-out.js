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
  const { instance } = useMsal();

  return (
    <div className="d-flex align-items-center float-end gap-3">
      <div>{name ? name : null}</div>
      <div >
        <Button
          type="button"
          class="btn btn-primary"
          onClick={() => handleLogout(instance)}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};
