const create<%= modelName %> = require('./<%= modelName.charAt(0).toLowerCase() %><%= modelName.slice(1) %>/create<%= modelName %>.js')
const update<%= modelName %> = require('./<%= modelName.charAt(0).toLowerCase() %><%= modelName.slice(1) %>/update<%= modelName %>.js')
const delete<%= modelName %> = require('./<%= modelName.charAt(0).toLowerCase() %><%= modelName.slice(1) %>/delete<%= modelName %>.js')

module.exports = {
    create<%= modelName %>,
    update<%= modelName %>,
    delete<%= modelName %>,
};