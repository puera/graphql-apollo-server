import { ApolloServer, IResolvers, PubSub } from 'apollo-server'
import mongoose from 'mongoose'

interface ServerProps {
  typeDefs: any
  resolvers: IResolvers 
}

const pubsub = new PubSub()
const startServer = ({ typeDefs, resolvers}: ServerProps) => {
  mongoose.connect('mongodb://localhost:27017/graphqltest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { pubsub }
  })
  server.listen().then(({ url }) => console.log(`Server started at ${url}`))
}

export default startServer