const GraphQL = require("graphql");
const GraphQLInputObjectType = GraphQL.GraphQLInputObjectType;
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLString = GraphQL.GraphQLString
const GraphQLList = GraphQL.GraphQLList

const UserType = require('../../types/user')
const ErrorType = require('../../types/error')

const Models = require('../../../models/index.js')

const CreateUserInput = new GraphQLInputObjectType({
    name: "CreateUserInput",
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

const CreateUserPayload = new GraphQLObjectType({
    name: 'CreateUserPayload',
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
            user: {
                type: UserType,
                description: 'Lorem ipsum dolar sit'
            }
        }
    }
})

module.exports = {
  type: CreateUserPayload,
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  args: {
    input: {
      type: CreateUserInput,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    }
  },
  
  resolve: async (root, args) => {
    let response = {}
    await Models.User.create(args.input).then((user) => {
        response.user = user
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
    console.log(response)
    return response
  }
};
