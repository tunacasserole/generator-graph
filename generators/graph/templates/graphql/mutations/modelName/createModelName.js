const GraphQL = require("graphql");
const GraphQLInputObjectType = GraphQL.GraphQLInputObjectType;
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLString = GraphQL.GraphQLString
const GraphQLList = GraphQL.GraphQLList

const <%= modelName %>Type = require('../../types/<%= modelName %>')
const ErrorType = require('../../types/error')

const Models = require('../../../models/index.js')

const Create<%= modelName %>Input = new GraphQLInputObjectType({
    name: "Create<%= modelName %>Input",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    fields() {
        return {
            name: {
                type: GraphQLString,
                description: 'Lorem ipsum dolar sit'
            },
            email: {
                type: GraphQLString,
                description: 'Lorem ipsum dolar sit'
            },
            description: {
                type: GraphQLString,
                description: 'Lorem ipsum dolar sit'
            }
        }
    }
})

const Create<%= modelName %>Payload = new GraphQLObjectType({
    name: 'Create<%= modelName %>Payload',
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
            <%= modelName %>: {
                type: <%= modelName %>Type,
                description: 'Lorem ipsum dolar sit'
            }
        }
    }
})

module.exports = {
  type: Create<%= modelName %>Payload,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  args: {
    input: {
      type: Create<%= modelName %>Input,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    }
  },
  
  resolve: async (root, args) => {
    let response = {}
    await Models.<%= modelName %>.create(args.input).then((<%= modelName %>) => {
        response.<%= modelName %> = <%= modelName %>
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
