import { makeExecutableSchema } from 'graphql-tools';

const typeDefs = [`
enum Priority {
  LOW
    MEDIUM
    HIGH
}
type Todo {
id: Int!
      text: String
      priority: Priority
      dueDate: Int #timestamp
}

type Query {
todos: [Todo]
}

schema {
query: Query
}
`];

const resolvers = {
Query: {
todos: () => ([
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
]),
  },
  }

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
