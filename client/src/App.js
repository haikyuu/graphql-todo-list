import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
  createNetworkInterface
} from "react-apollo";
import TodoList from "./components/TodoList";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
class App extends Component {
  createClient() {
    // Initialize Apollo Client with URL to our server
    return new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: "http://127.0.0.1:3000/graphql"
      })
    });
  }
  render() {
    return (
      <ApolloProvider client={this.createClient()}>
        <TodoList />
      </ApolloProvider>
    );
  }
}

export default App;
