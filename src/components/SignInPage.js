import React, { useEffect } from "react";
import { getFireAgents, getFireConfigs } from "../api/fireAgents";
import { Header, Icon, Segment, Container } from 'semantic-ui-react'

const SignInPage = () => {

  const { fireUiAuth } = getFireAgents();
  const { uiConfig } = getFireConfigs();

  useEffect(function onMount() {
    fireUiAuth.start('#firebaseui-auth-container', uiConfig);
  })


  return (
    <Segment className="sign-in-segment" textAlign="center" compact raised>
        <Header icon>
          <Icon name='sign in' />
          Sign in to the app
        </Header>
        <div id="firebaseui-auth-container"></div>
    </Segment>
  );

}

export { SignInPage }
