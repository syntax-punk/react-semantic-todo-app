import React, { useState } from "react";
import { List, Input, Header, Button, Form, Segment } from "semantic-ui-react";


const Todo = (props) => {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');


  const handleChange = (e) => {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const todoName = newName.trim();
    if (!todoName) return;

    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const EditItem = (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Header as="h3" sub content={`Edit Todo: ${props.name}`} />
        <Form.Group>
          <Input
            style={{ width: '100%' }}
            type="text"
            name="text"
            autoComplete="off"
            value={newName}
            placeholder={props.name}
            onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Button positive type="submit" content="Save" />
          <Button onClick={() => setEditing(false)} content="Cancel" />
        </Form.Group>
      </Form>
    </Segment>
  );

  const ViewItem = (
      <List.Content verticalAlign="middle" className="todo-item-view">
          <Header
            as="h3"
            content={props.name}
            className={`todo-item ${props.completed ? "item-completed" : ""}`}
            onClick={() => props.toggleTaskCompleted(props.id)} />
          <Button
            onClick={() => props.deleteTask(props.id)}
            floated="right"
            negative
            icon="trash"
            disabled={props.completed} />
          <Button
            onClick={() => setEditing(true)}
            floated="right"
            icon="edit"
            disabled={props.completed} />
      </List.Content>
  );

  return <List.Item>{isEditing ? EditItem : ViewItem}</List.Item>;
}

export { Todo }
