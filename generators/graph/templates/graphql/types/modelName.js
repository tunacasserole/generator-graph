const GraphQL = require("graphql");
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLString = GraphQL.GraphQLString;

module.exports = new GraphQLObjectType({
  name: "<%= modelName %>",
  fields() {
    return {
      <% var datatypeMatrix = {
        'VARCHAR(255)': 'STRING',
        'INT(11)': 'INTEGER',
        'TINYINT(1)': 'BOOLEAN',
        'TEXT': 'TEXT',
        'DATE': 'DATE',
        'DATETIME': 'DATETIME',
        'DECIMAL': 'DECIMAL',
        'FLOAT': 'FLOAT',
      } -%>
      
      <% for (var i = 0; i < modelAttrs.length; i++) { %>
        
        <%= modelAttrs[i][0] %>: {
          type: GraphQLString,
          description: "description",
          resolve(<%= modelName %>) {
            return <%= modelName %>.<%= modelAttrs[i][0] %>;
          }
        },
        
        // modelAttrs[i][0], attrType: datatypeMatrix[modelAttrs[i][1]["type"]] }); -%>

        <% } %>
      
    };
  }
});
