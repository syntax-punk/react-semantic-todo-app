import React, { useState } from "react";
import { TodoForm } from "./components/TodoForm";
import { FilterButton } from "./components/FilterButton";
import { Todo } from "./components/Todo";
import { v4 as uuid } from "uuid";
import { Segment, Container, Header, List } from "semantic-ui-react";


const TODOS_FILTER = {
  All: () => true,
  Active: (todo) => !todo.completed,
  Completed: (todo) => todo.completed,
};

const FILTER_LABELS = Object.keys(TODOS_FILTER);

const App = (props) => {
  const [todos, setTodos] = useState(props.todos);
  const [filter, setFilter] = useState("All");

  const toggleTaskCompleted = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  const deleteTodo = (id) => {
    const remainingTasks = todos.filter((todo) => id !== todo.id);
    setTodos(remainingTasks);
  }

  const editTodo = (id, newName) => {
    const editedTaskList = todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, name: newName };
      }
      return todo;
    });
    setTodos(editedTaskList);
  }

  const TodosList = todos
    .filter(TODOS_FILTER[filter])
    .map((todo) => (
      <Todo
        id={todo.id}
        name={todo.name}
        completed={todo.completed}
        key={todo.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTodo}
        editTask={editTodo}
      />
    ));

  const FilterButtons = FILTER_LABELS.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const addTodo = (name) => {
    const newTask = { id: uuid(), name: name, completed: false };
    setTodos([...todos, newTask]);
  }

  const tasksNoun = TodosList.length !== 1 ? "tasks" : "task";

  return (
    <>
      <Header as="h1" textAlign="center">TODO LIST:</Header>
      <Segment compact className="centered" style={{ padding: '32px', width: '640px' }}>
        <TodoForm addTodo={addTodo} />
        <Container fluid textAlign="center">{FilterButtons}</Container>
        <Container fluid style={{ marginTop: '32px' }}>
          <Header
            as="h2"
            id="list-heading"
            tabIndex="-1"
            color="teal"
            content={`${TodosList.length} ${tasksNoun} remaining`}
            textAlign="center"
          />
          <List divided relaxed='very' style={{ marginTop: '32px' }}>
            {TodosList}
          </List>
        </Container>
      </Segment>
    </>
  );
}

export { App };
