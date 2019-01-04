const GraphQL = require("graphql");
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLInputObjectType = GraphQL.GraphQLInputObjectType;
const GraphQLString = GraphQL.GraphQLString
const GraphQLInt = GraphQL.GraphQLInt
const GraphQLFloat = GraphQL.GraphQLFloat
const GraphQLBoolean = GraphQL.GraphQLBoolean
const GraphQLList = GraphQL.GraphQLList

const Models = require('../../../models/index.js')

const <%= modelName %>ListType = new GraphQLObjectType({
  name: '<%= modelName %>List',
  fields() {
    return {
      <% var dataTypes = {
        'VARCHAR(255)': 'GraphQLString',
        'INT(11)': 'GraphQLInt',
        'TINYINT(1)': 'GraphQLBoolean',
        'TEXT': 'GraphQLString',
        'DATE': 'GraphQLString',
        'DATETIME': 'GraphQLString',
        'DECIMAL': 'GraphQLFloat',
        'FLOAT': 'GraphQLFloat',
      } -%>
      <% for (var i = 0; i < modelAttrs.length; i++) { %>
        <%= modelAttrs[i][0] %>: {
          type: <%= dataTypes[modelAttrs[i][1]["type"]] %>,
          description: "description",
        },
        <% } %>
        
    }
  }
})

module.exports = {
  type: new GraphQLList(<%= modelName %>ListType),
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

  resolve: async (root, args) => {
    // Establish defaults and remove from arguments
    const offset = args.offset || 0
    const limit = args.limit || 10
    const search = args.search
    delete args.offset
    delete args.limit
    delete args.search

    // Issue query and return the promise
    return await Models.<%= modelName %>.findAll({where: args, include: [], offset, limit })
  }
};
