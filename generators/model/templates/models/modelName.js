'use strict';

module.exports = (sequelize, DataTypes) => {

  const <%= modelName %> = sequelize.define('<%= modelName %>', {
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
    <%- include('../attributes/attribute.js', { attr:  modelAttrs[i][0], attrType: datatypeMatrix[modelAttrs[i][1]["type"]] }); -%>
    <% } %>
  }, {});

return <%= modelName %>;
};


