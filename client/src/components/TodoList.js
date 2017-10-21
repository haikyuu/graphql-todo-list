//@flow
import React from "react"
import TodoItem from "./TodoItem.js"

import type { OperationComponent } from "react-apollo"
import type { todo as Todo, priority, TodoInput } from "../flowTypes"
import {
	ApolloClient,
	gql,
	graphql,
	ApolloProvider,
	createNetworkInterface,
	compose
} from "react-apollo"
import "./TodoList.css"
type SortType = "name" | "priority" | "due-date"
type State = {
	text: string,
	sortType: SortType
}
type Props = {
	addTodo: ({ text: string }) => void,
	deleteTodo: string => Promise<string>,
	editTodo: (id: string, todo: TodoInput) => Promise<Todo>,
	data: {
		loading: boolean,
		error: { message: string },
		todos: Array<Todo>
	}
}
const sortBy = (sortType: SortType) => (a: Todo, b: Todo) => {
	let comparableA
	let comparableB
	const priorityMap = {
		HIGH: 3,
		MEDIUM: 2,
		LOW: 1
	}

	const nameComparableA = a.text.toUpperCase()
	const nameComparableB = b.text.toUpperCase()
	if (sortType === "priority") {
		comparableA = priorityMap[a.priority]
		comparableB = priorityMap[b.priority]
	} else if (sortType === "due-date") {
		comparableB = b.dueDate ? new Date(b.dueDate).getTime() : -1
		comparableA = a.dueDate ? new Date(a.dueDate).getTime() : -1
	}
	if (comparableA !== undefined && comparableB !== undefined) {
		if (comparableA < comparableB) {
			return 1
		}
		//$FlowFixMe:
		if (comparableA > comparableB) {
			return -1
		}
	}
	//equal, sort by name
	if (nameComparableA < nameComparableB) {
		return -1
	} else if (nameComparableA > nameComparableB) {
		return 1
	} else {
		return 0
	}
}
class TodoList extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			text: "",
			sortType: "name"
		}
	}
	onEnterClick(event: SyntheticInputEvent<*>) {
		if (event.which == 13 || event.keyCode == 13) {
			this.addTodo()
			this.setState({
				text: ""
			})
		}
	}
	addTodo() {
		const { text } = this.state
		const todo = {
			text
		}
		return this.props.addTodo(todo)
	}
	deleteTodo(id) {
		this.props.deleteTodo(id).then(id => {
			return id
		})
	}
	editTodo(id: string, todo: TodoInput) {
		return this.props.editTodo(id, todo).then(todo => {
			return todo
		})
	}
	setSortType = (sortType: SortType) => () => {
		this.setState({
			sortType: sortType
		})
	}
	render() {
		const { sortType, text } = this.state
		const { data: { loading, error, todos } } = this.props
		if (loading) {
			return <p>Loading ...</p>
		}
		if (error) {
			return <p>{error.message}</p>
		}
		//sort mutate the array
		const sortedTodos = [...todos].sort(sortBy(sortType))
		return (
			<div className="container">
				<div className="header">
					<input
						type="text"
						value={text}
						className="new-todo"
						placeholder="Todo or not todo, this is the question"
						onKeyPress={this.onEnterClick.bind(this)}
						onChange={(event: SyntheticInputEvent<*>) => {
							const text = event.target.value
							this.setState({ text })
						}}
					/>
				</div>
				<div className="main">
					<div className="sort-type__container">
						<span className="description">Sort By</span>
						<button
							className={`${sortType === "name" ? "active" : ""}`}
							onClick={this.setSortType.bind(this)("name")}
						>
							Name
						</button>
						<button
							className={`${sortType === "due-date" ? "active" : ""}`}
							onClick={this.setSortType.bind(this)("due-date")}
						>
							Due Date
						</button>
						<button
							className={`${sortType === "priority" ? "active" : ""}`}
							onClick={this.setSortType.bind(this)("priority")}
						>
							Priority
						</button>
					</div>
					<ul className="todo-list">
						{sortedTodos.map(todo => (
							<TodoItem
								onDeleteClick={this.deleteTodo.bind(this)}
								handleEdit={this.editTodo.bind(this)}
								key={todo.id}
								todo={todo}
							/>
						))}
					</ul>
				</div>
				<div />
			</div>
		)
	}
}
const getTodos = gql`
	{
		todos {
			id
			text
			priority
			dueDate
		}
	}
`

const addTodo = gql`
	mutation addTodo($todo: AddTodoInput!) {
		addTodo(todo: $todo)
	}
`
const editTodo = gql`
	mutation editTodo($id: String!, $todo: EditTodoInput!) {
		editTodo(id: $id, todo: $todo) {
			id
			text
			priority
			dueDate
			completed
		}
	}
`

const deleteTodo = gql`
	mutation deleteTodo($id: String!) {
		deleteTodo(id: $id)
	}
`
type DeleteResult = {}
type AddResult = {
	addTodo: string
}
type EditResult = {
	editTodo: Todo
}
type GetResult = {
	todos: Array<Todo>
}
const withEdit: OperationComponent<EditResult> = graphql(editTodo, {
	props: ({ mutate }) => ({
		editTodo: (id: string, todo: TodoInput) =>
			mutate({
				variables: { id, todo },
				//https://github.com/apollographql/apollo-client/issues/899
				//$FlowFixMe
				refetchQueries: [{ query: getTodos }]
			})
	})
})
const withGet: OperationComponent<GetResult> = graphql(getTodos)
const withDelete: OperationComponent<DeleteResult> = graphql(deleteTodo, {
	props: ({ mutate }) => ({
		deleteTodo: (todoId: string) =>
			mutate({
				variables: { id: todoId },
				//https://github.com/apollographql/apollo-client/issues/899
				//$FlowFixMe
				refetchQueries: [{ query: getTodos }]
			})
	})
})
const withAdd: OperationComponent<AddResult> = graphql(addTodo, {
	props: ({ mutate }) => ({
		addTodo: (todo: Todo) =>
			mutate({
				variables: { todo },
				//$FlowFixMe
				refetchQueries: [{ query: getTodos }]
			})
	})
})

const withTodos = compose(withGet, withAdd, withEdit, withDelete)
export default withTodos(TodoList)
