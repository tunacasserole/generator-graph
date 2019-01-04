const GraphQL = require("graphql");
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLInputObjectType = GraphQL.GraphQLInputObjectType;
const GraphQLString = GraphQL.GraphQLString
const GraphQLInt = GraphQL.GraphQLInt
const GraphQLFloat = GraphQL.GraphQLFloat
const GraphQLBoolean = GraphQL.GraphQLBoolean
const GraphQLList = GraphQL.GraphQLList

const Models = require('../../../models/index.js')
const ErrorType = require('../../types/error')
const <%= modelName %>Type = require('../../types/<%= modelName.toLowerCase() %>')

const Update<%= modelName %>Input = new GraphQLInputObjectType({
    name: "Update<%= modelName %>Input",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    fields() {
        return {
            <% var dataTypes = {
                'VARCHAR(255)': 'GraphQLString',
                'INT(11)': 'GraphQLInt',
                'TINYINT(1)': 'GraphQLBoolean',
                'TEXT': 'GraphQLString',
                'DATE': 'GraphQLString',
                'DATETIME': 'GraphQLString',
                'DECIMAL': 'GraphQLFloat',
                'FLOAT': 'GraphQLFloat',
              } -%>
              <% for (var i = 0; i < modelAttrs.length; i++) { %>
                <%= modelAttrs[i][0] %>: {
                  type: <%= dataTypes[modelAttrs[i][1]["type"]] %>,
                  description: "description",
                },
                <% } %>
        }
    }
})

const Update<%= modelName %>Payload = new GraphQLObjectType({
    name: 'Update<%= modelName %>Payload',
    description: 'Lorem ipsum dolar sit',
    fields() { 
        return {
            message: {
                type: GraphQLString,
                description: 'Lorem ipsum dolar sit'
            },
            errors: {
                type: new GraphQLList(ErrorType),
                description: 'Lorem ipsum dolar sit'
            },
            <%= modelName.toLowerCase() %>: {
                type: <%= modelName %>Type,
                description: 'Lorem ipsum dolar sit'
            }
        }
    }
})

module.exports = {
  type: Update<%= modelName %>Payload,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  args: {
    input: {
      type: Update<%= modelName %>Input,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    }
  },
  
  resolve: async (root, args) => {
    let response = {}
    await Models.<%= modelName %>.create(args.input).then((<%= modelName.toLowerCase() %>) => {
        response.<%= modelName.toLowerCase() %> = <%= modelName.toLowerCase() %>
    }).catch((err) => {
        let errors = err.errors.map(error => {
            return {
                code: error.path,
                message: error.message
            }
        })
        response.message = "There was an error creating the action"
        response.errors = errors
    })
    // return response
    return response
  }
};
