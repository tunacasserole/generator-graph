const GraphQL = require('graphql')
const GraphQLList = GraphQL.GraphQLList
const GraphQLString = GraphQL.GraphQLString
const GraphQLInt = GraphQL.GraphQLInt

const Models = require('../../../models/index.js')
const UserType = require('../../types/user.js')


module.exports = {
  type: new GraphQLList(UserType),
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fermentum sapien lacus, ut imperdiet orci elementum sed. Donec lobortis vel nunc sit amet luctus.',
  args: {
    limit: {
      type: GraphQLInt,
      description: 'Limits the number of results returned in the page. Defaults to 10.',
    },
    offset: {
      type: GraphQLInt,
      description: 'Indicates the starting record from where the limit will be applied. Defaults to 0.'
    },
    search: {
      type: GraphQLString,
      description: 'String input for full-text searching. Supported fields include office name, person first and last name, address, city and state.'
    },
    sorters: {
      type: new GraphQLList(GraphQLString),
      description: 'A list of sorting rules to be applied to the request.'
    }
  },
  /*
   * Resolver responsible for fetch a list of offices. Arguments include offset and limit for paging
   * along with a search string for full-text searches. Additional support is required for handling
   * filtering; i.e. where clauses with operators.
   */
  resolve(root, args) {
    // Establish defaults and remove from arguments
    const offset = args.offset || 0
    const limit = args.limit || 10
    const search = args.search
    delete args.offset
    delete args.limit
    delete args.search

    // Issue query and return the promise
    return Models.User.findAll({where: args, include: [], offset, limit })
  }
};
