const list<%= modelName %>s = require('./<%= modelName.charAt(0).toLowerCase() %><%= modelName.slice(1) %>/list<%= modelName %>s.js')
const read<%= modelName %> = require('./<%= modelName.charAt(0).toLowerCase() %><%= modelName.slice(1) %>/read<%= modelName %>.js')

module.exports = {
  list<%= modelName %>s,
  read<%= modelName %>
}