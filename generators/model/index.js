'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const yaml = require('js-yaml');
const fs = require('fs');

const Sequelize = require('sequelize');

module.exports = class extends Generator {

  prompting() {

    this.log(
      yosay(`Welcome to the groundbreaking ${chalk.red('generator-graph')} generator!`)
    );

    const prompts = [

      {
        type: 'text',
        name: 'modelName',
        message: 'Name of the model you wish to generate.',
        default: "Complaint"
      },

      {
        type: 'text',
        name: 'tableName',
        message: 'Name of the table (must have a corresponding meta file of the same name).',
        default: "complaints"
      },


    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });

  }

  writing() {
    const tableName = this.props.tableName
    const modelName = this.props.modelName
    const modelNameLower = modelName.charAt(0).toLowerCase() + modelName.slice(1)
    const columnList = yaml.safeLoad(fs.readFileSync('config/meta/' + tableName + '.yml', 'utf8'));
    const attributes = Object.entries(columnList)

    // Sequelize Model file
    this.fs.copyTpl(
      this.templatePath('models/model.js'),
      this.destinationPath(`models/${modelNameLower}.js`),
      {
        modelName: modelName,
        tableName: tableName,
        attributes: attributes.slice(1)
      }
    );

    // GraphQL Index file
    this.fs.copyTpl(
      this.templatePath('graphql/index.js'),
      this.destinationPath(`graphql/index.js`)
    );

    // GraphQL Type file
    this.fs.copyTpl(
      this.templatePath('graphql/types/modelName.js'),
      this.destinationPath(`graphql/types/${modelNameLower}.js`),
      {
        modelName: modelName,
        attributes: attributes
      }
    );

    // GraphQL Query Index file
    this.fs.copyTpl(
      this.templatePath('graphql/queries/index.js'),
      this.destinationPath(`graphql/queries/index.js`),
      {
        modelName: modelName,
      }
    );

    // GraphQL Mutations Index file
    this.fs.copyTpl(
      this.templatePath('graphql/mutations/index.js'),
      this.destinationPath(`graphql/mutations/index.js`),
      {
        modelName: modelName,
      }
    );

    // GraphQL List Query
    this.fs.copyTpl(
      this.templatePath('graphql/queries/modelName/listmodelNames.js'),
      this.destinationPath(`graphql/queries/${modelNameLower}/list${modelName}s.js`),
      {
        modelName: modelName,
        attributes: attributes
      }
    );

    // GraphQL Read Query
    this.fs.copyTpl(
      this.templatePath('graphql/queries/modelName/readmodelName.js'),
      this.destinationPath(`graphql/queries/${modelNameLower}/read${modelName}.js`),
      {
        modelName: modelName,
        attributes: attributes
      }
    );

    // GraphQL Create Mutation
    this.fs.copyTpl(
      this.templatePath('graphql/mutations/modelName/createmodelName.js'),
      this.destinationPath(`graphql/mutations/${modelNameLower}/create${modelName}.js`),
      {
        modelName: modelName,
        attributes: attributes
      }
    );

    // GraphQL Update Mutation
    this.fs.copyTpl(
      this.templatePath('graphql/mutations/modelName/updatemodelName.js'),
      this.destinationPath(`graphql/mutations/${modelNameLower}/update${modelName}.js`),
      {
        modelName: modelName,
        attributes: attributes
      }
    );

    // GraphQL Delete Mutation
    this.fs.copyTpl(
      this.templatePath('graphql/mutations/modelName/deletemodelName.js'),
      this.destinationPath(`graphql/mutations/${modelNameLower}/delete${modelName}.js`),
      {
        modelName: modelName,
        attributes: attributes
      }
    );
  }

}

