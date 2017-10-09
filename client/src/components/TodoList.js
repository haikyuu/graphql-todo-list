//@flow
import React from "react";
import TodoItem from "./TodoItem.js";
import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";

const TodoList = ({ data: { loading, error, todos } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      <div>
        <h1>Todo list</h1>
        <input type="text" />
      </div>
      <div>
        <ul>{todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}</ul>
      </div>
      <div />
    </div>
  );
};

const getTodos = gql`
  {
    todos {
      id
      text
      priority
    }
  }
`;
const withTodos = graphql(getTodos, {
  options: { notifyOnNetworkStatusChange: true }
});
export default withTodos(TodoList);
