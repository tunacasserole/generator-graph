# app/graphql/schema.rb
Schema = GraphQL::Schema.define do
  mutation Mutations::MutationIndex
  query Queries::QueryIndex
end # GraphQL::Schema.define
