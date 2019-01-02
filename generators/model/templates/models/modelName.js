'use strict';
module.exports = (sequelize, DataTypes) => {
  const <%= modelName %> = sequelize.define('<%= modelName %>', {

    // Model Attributes
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },

    <%= modelAttrs %>


  }, {});

return <%= modelName %>;
};