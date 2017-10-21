import "react-dates/initialize"
import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import "icono/dist/icono.min.css"
import {
	ApolloClient,
	gql,
	graphql,
	ApolloProvider,
	createNetworkInterface
} from "react-apollo"
import TodoList from "./components/TodoList"
import "react-dates/lib/css/_datepicker.css"

const styles = {
	fontFamily: "sans-serif",
	textAlign: "center"
}
class App extends Component {
	createClient() {
		// Initialize Apollo Client with URL to our server
		return new ApolloClient({
			networkInterface: createNetworkInterface({
				uri: "http://127.0.0.1:3000/graphql"
				// dataIdFromObject: o => o.id
			})
		})
	}
	render() {
		return (
			<ApolloProvider client={this.createClient()}>
				<div className="app-container">
					<div className="title-container">
						<h1>Todo list</h1>
					</div>
					<TodoList />
				</div>
			</ApolloProvider>
		)
	}
}

export default App
