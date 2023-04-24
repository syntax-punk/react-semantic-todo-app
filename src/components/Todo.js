import React, { useState } from "react";
import { List, Input, Header, Button, Form, Segment, Checkbox } from "semantic-ui-react";


const Todo = (props) => {
  const { name,
    completed,
    id,
    toggleTodoCompleted,
    deleteTodo,
    editTodo
  } = props;

  const [isEditing, setEditing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [newName, setNewName] = useState('');


  const handleChange = (e) => {
    setNewName(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const todoName = newName.trim();
    if (!todoName) return;

    await editTodo(id, newName);
    setNewName("");
    setEditing(false);
    setProcessing(false);
  }

  const handleDeleteTodo = async (id) => {
    setRemoving(true);
    await deleteTodo(id);
    setRemoving(false);
  }

  const EditItem = (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Header as="h3" sub content={`Edit Todo: ${name}`} />
        <Form.Group>
          <Input
            style={{ width: '100%' }}
            type="text"
            name="text"
            autoComplete="off"
            value={newName}
            placeholder={name}
            onChange={handleChange}
            disabled={processing} />
        </Form.Group>
        <Form.Group>
          <Button positive type="submit" content="Save" loading={processing} />
          <Button onClick={() => setEditing(false)} content="Cancel" />
        </Form.Group>
      </Form>
    </Segment>
  );

  const ViewItem = (
      <List.Content verticalAlign="middle" className="todo-item-view">
          <Checkbox
            className="todo-check"
            checked={completed}
            onClick={() => toggleTodoCompleted(id)} />
          <Header
            as="h3"
            content={name}
            className={`todo-item ${completed ? "item-completed" : ""}`}
            onClick={() => toggleTodoCompleted(id)} />
          <Button
            onClick={() => handleDeleteTodo(id)}
            floated="right"
            negative
            icon="trash"
            loading={removing} />
          <Button
            onClick={() => setEditing(true)}
            floated="right"
            icon="edit"
            disabled={completed}
            color="blue" />
      </List.Content>
  );

  return <List.Item>{isEditing ? EditItem : ViewItem}</List.Item>;
}

export { Todo }
