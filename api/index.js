import express from "express"
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './presentation/schema';

const PORT = 3000;

const app = express()

app.get('/', function (req, res) {
	res.send('Hello World!')
})

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: {}, debug: true }));

app.listen(PORT, function () {
console.log('Example app listening on port 3000!')
})
