import React, { useState } from "react";
import { Button, Form, Header, Input } from "semantic-ui-react";

const TodoForm = (props) => {
  const [processing, setProcessing] = useState(false);

  const { addTodo } = props;
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoName = name.trim();
    if (!todoName) return;

    setProcessing(true);
    await addTodo(todoName);
    setProcessing(false);
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
          disabled={processing}
        />
      </Form.Group>
      <Form.Group>
        <Button positive type="submit" content="Add Todo" loading={processing} />
      </Form.Group>
    </Form>
  );
}

export { TodoForm };
