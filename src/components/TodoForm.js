import React, { useState } from "react";
import { Button, Form, Header, Input } from "semantic-ui-react";

const TodoForm = (props) => {
  const [name, setName] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const todoName = name.trim();
    if (!todoName) return;

    props.addTodo(todoName);
    setName("");
  }


  const handleChange = (e) => {
    setName(e.target.value);
  }

  return (
    <Form onSubmit={handleSubmit} style={{ maxWidth: '640px' }}>
      <Header as="h2" sub content="What needs to be done?" />
      <Form.Group>
        <Input
          style={{ width: '100%' }}
          type="text"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Button positive type="submit" content="Add Todo" />
      </Form.Group>
    </Form>
  );
}

export { TodoForm };
