//@flow
export type priority = "HIGH" | "MEDIUM" | "LOW"

export type todo = {
	id: string,
	text: string,
	dueDate?: string,
	priority: priority,
	completed: boolean
}

export type TodoInput = {
	text?: string,
	dueDate?: string,
	priority?: priority,
	completed?: boolean
}
