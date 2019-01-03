'use strict';

module.exports = (sequelize, DataTypes) => {
  const <%= modelName %> = sequelize.define('<%= modelName %>', {
    <% for (var i = 0; i < modelAttrs.length; i++) { %>
    <%- include('../attributes/attribute.js', { attr:  modelAttrs[i], attrType: 'INTEGER' }); -%>
    <% } %>

  }, {});

return <%= modelName %>;
};


