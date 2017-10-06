//@flow
import TodoDB from "../db/queryBuilders/todo";
import DataLoader from "dataloader";

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

  static getLoaders() {
    const getById = new DataLoader(ids => TodoDB.getByIds(ids));
    const primeLoaders = todos => {
      todos.forEach(todo => getById.clear(todo.id).prime(todo.id, todo));
    };
    return { getById, primeLoaders };
  }
  constructor(data) {
    this.id = data.id;
    this.text = data.text;
    this.priority = data.priority;
    this.dueDate = data.dueDate;
  }

  static async load(ctx, args) {
    if (!args.id) return null;
    const data = await ctx.dataLoaders.todo.getById.load(args.id);
    if (!data) return null;

    return new Todo(data);
  }

  static async loadAll(ctx, args) {
    const data = await TodoDB.getAll();
    await ctx.dataLoaders.todo.primeLoaders(data);

    return data.map(row => new Todo(row));
  }
}

export default Todo;
