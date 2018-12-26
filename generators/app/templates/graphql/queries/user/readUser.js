const GraphQL = require('graphql')
const GraphQLString = GraphQL.GraphQLString
const GraphQLInt = GraphQL.GraphQLInt

const Models = require('../../../models/index.js')
const UserType = require('../../types/user.js')

module.exports = {
  type: UserType,
  description: 'Returns a single user for the supplied user id.',
  args: {
    id: {
      type: GraphQLInt,
      description: 'The unique identifier of the user.',
    }
  },
  
  resolve(root, args) {
    let id = args.id
    // Issue query and return the promise
    return Models.User.findById(id)
  }
};
