import { makeExecutableSchema } from "graphql-tools";
import Todo from "../business/todo";

const typeDefs = [
  `
  enum Priority {
    LOW
    MEDIUM
    HIGH
  }
  type Todo {
    id: String!
    text: String!
    priority: Priority
    dueDate: String
    completed: Boolean!
  }

  type Query {
    todos: [Todo]
    todo(id: String!): Todo
  }

  input AddTodoInput{
    text: String!
    priority: Priority
    dueDate: String
  }
  input EditTodoInput{
    text: String
    priority: Priority
    dueDate: String
  }
  type Mutation {
    addTodo(todo: AddTodoInput!): String
    editTodo(id: String!, todo: EditTodoInput): Todo
    deleteTodo(id: String!): Int
  }
  schema {
    query: Query
    mutation: Mutation
  }
`
];

const resolvers = {
  Query: {
    todos: async (_, args, ctx) => Todo.loadAll(ctx, args),
    todo: async (_, args, ctx) => Todo.load(ctx, args)
  },
  Mutation: {
    addTodo: async (_, args, ctx) => Todo.AddTodo(ctx, args),
    editTodo: async (_, args, ctx) => Todo.EditTodo(ctx, args),
    deleteTodo: async (_, args, ctx) => Todo.DeleteTodo(ctx, args)
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
