Types::<%= model_name %>Type = GraphQL::ObjectType.define do
  name '<%= model_name %>Type'
  description "Lorem ipsum dolar sit"

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
<% for (var i = 0; i < attributes.length; i++) { -%>
  field :<%= attributes[i][0] %>, types.String, description: 'Lorem ipsum dolar sit'
<% } -%>

end # Types:<%= model_name %>Type