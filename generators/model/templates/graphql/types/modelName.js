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
      <% for (var i = 0; i < attributes.length; i++) { %>
        <%= attributes[i][0] %>: {
          type: <%= dataTypes[attributes[i][1]["type"]] %>,
          description: "description",
          resolve(<%= modelName %>) {
            return <%= modelName %>.<%= attributes[i][0] %>;
          }
        },
        <% } %>
    };
  }
});
