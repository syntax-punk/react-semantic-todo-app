import React from "react";
import { Button } from "semantic-ui-react";
import { signOuFlow } from "../utils/authRequests";

const SignOut = () => {
  const handleSignOut = async () => {
    await signOuFlow();
  }

  return (
    <Button content="Sign Out"
      icon="sign-out"
      circular
      basic
      color="red"
      className="sign-out-btn"
      onClick={handleSignOut} />
  )
}

export { SignOut }
