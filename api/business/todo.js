//@flow
import TodoDB from "../db/queryBuilders/todo";

type Priority = "HIGH" | "MEDIUM" | "LOW";

const mockedTodos = [
  {
    id: 1,
    text: "rock the assignment",
    priority: "HIGH"
  },
  {
    id: 2,
    text: "rock the interview",
    priority: "HIGH"
  }
];

class Todo {
  id: number;
  text: string;
  priority: Priority;
  dueDate: number;

  constructor(data) {
    this.id = data.id;
    this.text = data.text;
    this.priority = data.priority;
    this.dueDate = data.dueDate;
  }

  static async load(ctx, args) {
    const data = await TodoDB.getById(args.id);
    if (!data) return null;

    return new Todo(data);
  }

  static async loadAll(ctx, args) {
    const data = await TodoDB.getAll();

    return data.map(row => new Todo(row));
  }
}

export default Todo;
