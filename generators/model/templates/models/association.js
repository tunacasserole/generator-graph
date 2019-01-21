
<% for (var i = 0; i < ids.length; i++) { -%>
<% associatedModel = (ids[i].replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); }).slice(0,-2)) -%>
<% associatedModel = associatedModel.charAt(0).toUpperCase() + associatedModel.slice(1) -%>
  // <%= modelName %>.associate = function (models) {
    // models.<%= modelName %>.belongsTo(models.<%= associatedModel %>, {
      // foreignKey: "id",
      // sourceKey: "<%= ids[i] %>"
    // })
  // },
<% } %>