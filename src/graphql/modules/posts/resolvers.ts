import Post from '../../../models/Post'
import User from '../../../models/User'

export default {
  Post: {
    author: (post: any) => User.findById(post.author)
  },
  Query: {
    posts: () => Post.find(),
    post: (_: any, { id }: any) => Post.findById(id) 
  }, 
  Mutation: {
    createPost: (_: any, { data }: any) => Post.create(data),
    updatePost: (_: any, { id, data }: any) => Post.findOneAndUpdate(id, data, { new: true }),
    deletePost: async (_: any, { id }: any) => !!(await Post.findOneAndDelete(id)),
  },  
}