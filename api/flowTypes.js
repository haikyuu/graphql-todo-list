//@flow
export type Priority = "HIGH" | "MEDIUM" | "LOW"

export type Todo = {
	id: string,
	text: string,
	dueDate?: string,
	priority: Priority,
	completed: boolean
}
