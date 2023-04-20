import React from "react";
import { Message, Icon } from "semantic-ui-react";

const LoadingMessage = () => {
  return (
    <Message icon compact info>
      <Icon name='circle notched' loading />
      <Message.Content>
        <Message.Header>
          Just one second
        </Message.Header>
        We're fetching todo list for you.
      </Message.Content>
    </Message>
  )
};

export { LoadingMessage }
