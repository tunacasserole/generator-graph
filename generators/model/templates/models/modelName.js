'use strict';

module.exports = (sequelize, DataTypes) => {

  const <%= modelName %> = sequelize.define('<%= modelName %>', {
    <% var dataTypes = {
      'VARCHAR(255)': 'STRING',
      'INT(11)': 'INTEGER',
      'TINYINT(1)': 'BOOLEAN',
      'TEXT': 'TEXT',
      'DATE': 'DATE',
      'DATETIME': 'TIMESTAMP',
      'DECIMAL': 'DECIMAL',
      'FLOAT': 'FLOAT',
    } -%>
    <% for (var i = 0; i < modelAttrs.length; i++) { %>
    <%- include('../attributes/attribute.js', { attr:  modelAttrs[i][0], attrType: dataTypes[modelAttrs[i][1]["type"]] }); -%>
    <% } %>
  }, {});

return <%= modelName %>;
};


