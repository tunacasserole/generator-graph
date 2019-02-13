'use strict';

module.exports = (sequelize, DataTypes) => {

  const <%= modelName %> = sequelize.define('<%= modelName %>', {
    <%_ var ids = [] -%> 
    <%_ var dataTypes = { 'VARCHAR(255)': 'STRING', 'INT(11)': 'INTEGER', 'TINYINT(1)': 'BOOLEAN', 'TEXT': 'TEXT', 'DATE': 'DATE', 'DATETIME': 'TIME', 'DECIMAL': 'DECIMAL', 'FLOAT': 'FLOAT' } -%>
    <% for (var i = 0; i < attributes.length; i++) { -%>
    <% if(attributes[i][0].endsWith('_id')) { ids.push(attributes[i][0]) } %>
    <%- include('attribute.js', { attribute: attributes[i][0], attributeType: dataTypes[attributes[i][1]["type"]] }); -%>
    <% } %>
  }, {
    tableName: '<%= tableName %>'
  })    
    <%- include('association.js', { modelName: modelName, ids: ids } ); -%>
  return <%= modelName %>;
};



