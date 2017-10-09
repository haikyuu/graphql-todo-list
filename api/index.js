import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import schema from "./presentation/schema";
import Todo from "./business/todo";
const PORT = 3000;

const app = express();
app.use(cors());
const corsOptions = {
  origin(origin, callback) {
    callback(null, true);
  },
  credentials: true
};
app.use(cors(corsOptions));
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};
app.use(allowCrossDomain);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      dataLoaders: {
        todo: Todo.getLoaders()
      }
    },
    debug: true
  })
);
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);
app.listen(PORT, function() {
  console.log("Example app listening on port 3000!");
});
