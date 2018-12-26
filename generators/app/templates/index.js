"use strict";

// Initialize environment variables
require("dotenv").config();

// Load Express/GraphQL
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const GraphHTTP = require("express-graphql");
const Schema = require("./graphql");

// Configure Express Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Register Express routes
app.use(
  "/graphql",
  GraphHTTP(request => ({
    schema: Schema,
    pretty: true,
    graphiql: true
  }))
)

app.listen(4000)