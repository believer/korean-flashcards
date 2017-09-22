const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schema')

const PORT = 3000

const app = express()

app.use(cors())

const graphqlOptions = { schema }

app.get('/graphql', graphqlExpress(graphqlOptions))
app.post('/graphql', bodyParser.json(), graphqlExpress(graphqlOptions))
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT)
