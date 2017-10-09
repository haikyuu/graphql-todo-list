//@flow
import TodoDB from "../db/queryBuilders/todo";
import DataLoader from "dataloader";

import type { Priority, todo } from "../flowTypes";
const mockedTodos = [
  {
    id: "1",
    text: "rock the assignment",
    priority: "HIGH"
  },
  {
    id: "2",
    text: "rock the interview",
    priority: "HIGH"
  }
];

class Todo {
  id: string;
  text: string;
  priority: Priority;
  dueDate: string;

  static getLoaders() {
    const getById = new DataLoader(ids => TodoDB.getByIds(ids));
    const primeLoaders = todos => {
      todos.forEach(todo => getById.clear(todo.id).prime(todo.id, todo));
    };
    return { getById, primeLoaders };
  }
  constructor(data: todo) {
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

  static async AddTodo(ctx, { todo }) {
    if (!todo.text) throw new Error("Cannot add a todo without text, sorry :(");

    const id = await TodoDB.addOne(todo);

    return id;
  }

  static async EditTodo(ctx, { id, todo }) {
    if (!id) throw new Error("Cannot edit a todo without its id, sorry :(");

    const editedTodo = await TodoDB.editOne(id, todo);

    return editedTodo;
  }

  static async DeleteTodo(ctx, { id }) {
    if (!id) throw new Error("Cannot delete a todo without its id, sorry :(");

    const numberOfAffectedRows = await TodoDB.deleteOne(id);

    return numberOfAffectedRows;
  }

  static async loadAll(ctx, args) {
    const data = await TodoDB.getAll();
    await ctx.dataLoaders.todo.primeLoaders(data);

    return data.map(row => new Todo(row));
  }
}

export default Todo;
