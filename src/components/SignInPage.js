import React from "react";
import { Button, Container } from "semantic-ui-react";
import { signInFlow } from "../utils/authRequests";

const SignInPage = () => {

  const handleSignIn = async () => {
    const user = await signInFlow();
    console.log(user);
  }

  return (
    <Container>
      <Button content="Sign In" onClick={handleSignIn} />
    </Container>
  )
  // const uiConfig = {
  //   signInFlow: 'popup',
  //   signInSuccessUrl: '/',
  //   signInOptions: [
  //     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //     firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //   ],
  // };

  // const ui = new firebaseui.auth.AuthUI(firebase.auth());
  // ui.start('#firebaseui-auth-container', uiConfig);

  // return (
  //   <div id="firebaseui-auth-container"></div>
  // );

}

export { SignInPage }
