import User from '../../../models/User'
import { USER_ADDED } from './channels'

export default {
  User: {
    fullName: (user: any) => `${user.firstName} ${user.lastName}`,
  },
  Query: {
    users: () => User.find(),
    user: (_: any, { id }: any) => User.findById(id)  
  }, 
  Mutation: {
    createUser: async (_: any, { data }: any, { pubsub }: any) => {
      const user = await User.create(data)
      pubsub.publish(USER_ADDED, {
        userAdded: user
      })
      return user
    },
    updateUser: (_: any, { id, data }: any) => User.findOneAndUpdate(id, data, { new: true }),
    deleteUser: async (_: any, { id }: any) => (!!await User.findOneAndDelete(id)),
  },
  Subscription: {
    userAdded: {
      subscribe: (obj: any, args: any, { pubsub }: any) => pubsub.asyncIterator(USER_ADDED),
    }
  }  
}