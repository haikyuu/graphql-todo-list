//@flow
import React from "react"
import "./todoItem.css"
//Share flow types with server
import type { todo as Todo, priority, TodoInput } from "../flowTypes"
import { SingleDatePicker } from "react-dates"
import moment from "moment"
type Props = {
	todo: Todo,
	onDeleteClick: string => void,
	handleEdit: (id: string, todo: TodoInput) => Promise<Todo>
}
type State = {
	isEditing: boolean,
	temporaryText: string,
	focused: boolean
}
const priorityMap = {
	UP: {
		HIGH: "HIGH",
		MEDIUM: "HIGH",
		LOW: "MEDIUM"
	},
	DOWN: {
		HIGH: "MEDIUM",
		MEDIUM: "LOW",
		LOW: "LOW"
	}
}
export default class TodoItem extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			isEditing: false,
			temporaryText: props.todo.text,
			focused: false
		}
	}
	onInputClick() {
		this.setState({ isEditing: true })
	}
	onKeyPress(event: SyntheticInputEvent<*>) {
		const { isEditing, temporaryText } = this.state
		const { todo: { id } } = this.props
		if (event.which == 13) {
			if (this.state.isEditing && temporaryText !== this.props.text) {
				this.props.handleEdit(id, { text: temporaryText })
				this.setState({ isEditing: false })
			}
		}
	}
	onKeyDown(event: SyntheticInputEvent<*>) {
		if (event.which == 27) {
			this.setState({ isEditing: false })
		}
	}
	onInputChange(event: SyntheticInputEvent<HTMLInputElement>) {
		const text = event.target.value
		this.setState({ temporaryText: text })
	}
	movePriority(upOrDown: "UP" | "DOWN") {
		const { todo: { id, priority }, handleEdit } = this.props

		let targetPriority = priorityMap[upOrDown][priority]
		this.props.handleEdit(id, { priority: targetPriority })
	}
	handleChecked(event: SyntheticInputEvent<HTMLInputElement>) {
		const { todo: { id }, handleEdit } = this.props
		const completed = event.target.checked
		handleEdit(id, { completed })
	}
	handleDueDateChange(date) {
		const { todo: { id }, handleEdit } = this.props
		handleEdit(id, { dueDate: moment(date).format() })
	}
	render() {
		const { isEditing, temporaryText } = this.state
		const { todo, onDeleteClick } = this.props

		return (
			<li className="item-container">
				<div className="view">
					<input
						name="todo"
						className="toggle"
						type="checkbox"
						value={todo.completed}
						onChange={this.handleChecked.bind(this)}
					/>
					{isEditing ? (
						<input
							onKeyPress={this.onKeyPress.bind(this)}
							onKeyDown={this.onKeyDown.bind(this)}
							type="text"
							className="edit"
							value={temporaryText}
							onChange={this.onInputChange.bind(this)}
						/>
					) : (
						<label
							className="label"
							htmlFor="todo"
							onClick={this.onInputClick.bind(this)}
						>
							{temporaryText}
						</label>
					)}
					<div className="date-picker__container">
						{/* <span>due</span> */}
						<SingleDatePicker
							placeholder={"Due Date"}
							date={todo.dueDate ? moment(todo.dueDate) : null} // momentPropTypes.momentObj or null
							onDateChange={this.handleDueDateChange.bind(this)} // PropTypes.func.isRequired
							focused={this.state.focused} // PropTypes.bool
							onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
						/>
					</div>
					<div className="priorityContainer">
						<button
							className="up icono-caretUp"
							onClick={() => this.movePriority.bind(this)("UP")}
						/>
						<span className="priority">{todo.priority}</span>
						<button
							className="down icono-caretDown"
							onClick={() => this.movePriority.bind(this)("DOWN")}
						/>
					</div>
					<button className="delete" onClick={() => onDeleteClick(todo.id)}>
						X
					</button>
				</div>
			</li>
		)
	}
}
