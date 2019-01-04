const GraphQL = require("graphql");
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLInputObjectType = GraphQL.GraphQLInputObjectType;
const GraphQLString = GraphQL.GraphQLString
const GraphQLInt = GraphQL.GraphQLInt
const GraphQLFloat = GraphQL.GraphQLFloat
const GraphQLBoolean = GraphQL.GraphQLBoolean
const GraphQLList = GraphQL.GraphQLList

const Models = require('../../../models/index.js')
const <%= modelName %>Type = require('../../types/<%= modelName.toLowerCase() %>.js')

module.exports = {
  type: <%= modelName %>Type,
  description: 'Returns a single access task for the supplied <%= modelName.toLowerCase() %> id.',
  args: {
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
  },
  
  resolve: async (root, args) => {
    return await Models.<%= modelName %>.findById(args.id)
  }
};


