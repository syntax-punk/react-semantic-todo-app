import React, { useEffect, useRef, useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { FilterButton } from "../components/FilterButton";
import { Todo } from "../components/Todo";
import { Segment, Container, Header, List } from "semantic-ui-react";
import { addTodoToDb, deleteTodoFromDb, updateTodoInDb, subscribeToChangesInDb } from "../utils/dbRequests";
import { serverTimestamp } from "firebase/firestore";
import { LoadingMessage } from "../components/LoadingMessage";

const TODOS_FILTER = {
  All: () => true,
  Active: (todo) => !todo.completed,
  Completed: (todo) => todo.completed,
};

const FILTER_LABELS = Object.keys(TODOS_FILTER);

const MainView = (props) => {
  const { name, uid } = props;
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [fetchingData, setFetchingData] = useState(false);
  const initialFetchCompleted = useRef(false);

  useEffect(function fetchTodosOnMount() {
    if (!initialFetchCompleted.current)
      setFetchingData(true);

    const unsubscribe = subscribeToChangesInDb(uid, (todos) => {
      setTodos(todos);
      if (!initialFetchCompleted.current) {
        setFetchingData(false);
        initialFetchCompleted.current = true;
      }
    });
    
    const cleanup = () => { unsubscribe() };

    return cleanup;
  }, [uid]);

  const addTodo = (name) => {
    const newTodoItem = {
      name,
      completed: false,
      uid,
      createdAt: serverTimestamp(),
      updatedAt: null
     };

    addTodoToDb(newTodoItem)
  }

  const deleteTodo = (id) => {
    const todoToRemove = todos.find((todo) => todo.id === id);

    if (!todoToRemove) return;

    deleteTodoFromDb(todoToRemove.id);
  }

  const editTodo = async (id, value) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    await updateTodoInDb(todo.id, { name: value, updatedAt: serverTimestamp() })
  }

  const toggleTaskCompleted = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) return;

    updateTodoInDb(todo.id, { completed: !todo.completed });
  }

  const TodosList = todos
    .filter(TODOS_FILTER[filter])
    .map((todo) => (
      <Todo
        id={todo.id}
        name={todo.name}
        completed={todo.completed}
        key={todo.id}
        toggleTodoCompleted={toggleTaskCompleted}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
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
  const listTitle = `${TodosList.length} ${tasksNoun} remaining`;

  return (
    <>
      <Header as="h1" textAlign="center">{name}'s TODO LIST:</Header>
      <Segment compact className="centered main-segment">
        <TodoForm addTodo={addTodo} />
        <Container fluid textAlign="center">{FilterButtons}</Container>
        <Container fluid style={{ marginTop: '32px' }}>
          {
            fetchingData ? (
              <LoadingMessage />
            ) : (
              <>
                <Header
                  as="h2"
                  id="list-heading"
                  tabIndex="-1"
                  color="teal"
                  content={listTitle}
                  textAlign="center"
                />
                <Segment style={{ marginTop: '24px' }}>
                  <List divided relaxed='very'>
                    {TodosList}
                  </List>
                </Segment>
              </>
            )
          }
        </Container>
      </Segment>
    </>
  );
}

export { MainView };
