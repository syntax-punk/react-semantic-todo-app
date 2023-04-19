import React, { useEffect, useState } from "react";
import { TodoForm } from "./components/TodoForm";
import { FilterButton } from "./components/FilterButton";
import { Todo } from "./components/Todo";
import { Segment, Container, Header, List } from "semantic-ui-react";
import { fetchData, addTodoToDb, deleteTodoFromDb, updateTodoInDb } from "./utils/dbRequests";

const TODOS_FILTER = {
  All: () => true,
  Active: (todo) => !todo.completed,
  Completed: (todo) => todo.completed,
};

const FILTER_LABELS = Object.keys(TODOS_FILTER);

const App = (props) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(function fetchTodosOnMount() {
    fetchData()
    .then((todos) => {
      setTodos(todos);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
  }, []);

  const addTodo = (name) => {
    const newTodoItem = { name: name, completed: false };

    addTodoToDb(newTodoItem)
    .then((docRef) => {
      setTodos([...todos, {...newTodoItem, id: docRef.id}]);
    });
  }

  const deleteTodo = (id) => {
    const todoToRemove = todos.find((todo) => todo.id === id);

    if (!todoToRemove) return;

    deleteTodoFromDb(todoToRemove.id)
    .then(() => {
      const remainingTodos = todos.filter((todo) => id !== todo.id);
      setTodos(remainingTodos);
    });
  }

  const editTodo = (id, newName) => {
    let updatedTodo;
    const updatedTodoList = todos.map((todo) => {
      if (id === todo.id) {
        updatedTodo = { ...todo, name: newName };
        return updatedTodo;
      }
      return todo;
    });

    if (!updatedTodo) return;

    updateTodoInDb(updatedTodo.id, { name: updatedTodo.name })
    .then(() => {
      setTodos(updatedTodoList);
    });
  }

  const toggleTaskCompleted = (id) => {
    let updatedTodo;
    const updatedTodoList = todos.map((todo) => {
      if (id === todo.id) {
        updatedTodo = { ...todo, completed: !todo.completed };
        return updatedTodo;
      }
      return todo;
    });

    if (!updatedTodo) return;

    updateTodoInDb(updatedTodo.id, { completed: updatedTodo.completed })
    .then(() => {
      setTodos(updatedTodoList);
    });
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


  const tasksNoun = TodosList.length !== 1 ? "tasks" : "task";

  return (
    <>
      <Header as="h1" textAlign="center">TODO LIST:</Header>
      <Segment compact className="centered main-segment">
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
          <Segment style={{ marginTop: '24px' }}>
            <List divided relaxed='very'>
              {TodosList}
            </List>
          </Segment>
        </Container>
      </Segment>
    </>
  );
}

export { App };
