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
  id: Int!
        text: String!
        priority: Priority
        dueDate: Int #timestamp
  }

  type Query {
  todos: [Todo]
           todo(id: Int!): Todo
  }

  schema {
  query: Query
  }
`
];

const resolvers = {
  Query: {
    todos: async (_, args, ctx) => Todo.loadAll(ctx, args),
    todo: async (_, args, ctx) => Todo.load(ctx, args)
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
