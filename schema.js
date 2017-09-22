const { db } = require('./adapters/db')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type Word {
    id: Int
    english: String
    korean: String
    romanized: String
  }

  type Query {
    words: [Word]
  }

  schema {
    query: Query
  }
`

const words = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 }
]

const resolvers = {
  Query: {
    async words() {
      const sql = `
        SELECT * FROM words
      `

      try {
        return await db.query(sql)
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
})
