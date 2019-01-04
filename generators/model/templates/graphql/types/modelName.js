const GraphQL = require('graphql')
const GraphQLList = GraphQL.GraphQLList
const GraphQLString = GraphQL.GraphQLString
const GraphQLBoolean = GraphQL.GraphQLBoolean
const GraphQLInt = GraphQL.GraphQLInt
const GraphQLObjectType = GraphQL.GraphQLObjectType;

module.exports = new GraphQLObjectType({
  name: "<%= modelName %>",
  fields() {
    return {
      <% var dataTypes = {
        'VARCHAR(255)': 'GraphQLString',
        'INT(11)': 'GraphQLInt' ,
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
          resolve(<%= modelName %>) {
            return <%= modelName %>.<%= modelAttrs[i][0] %>;
          }
        },
        <% } %>
    };
  }
});
