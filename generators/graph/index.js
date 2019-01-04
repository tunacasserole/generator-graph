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
        message: 'Name of the GraphQLType you wish to create.  Must have a corresponding config meta file.',
        default: "Complaint"
      },

    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });

  }

  writing() {
    const modelMeta = yaml.safeLoad(fs.readFileSync('config/meta/complaint.yml', 'utf8'));
    const attrs = Object.entries(modelMeta)


    const metaModelName = this.props.modelName
    const metaFileName = `${this.props.modelName.charAt(0).toLowerCase()}${this.props.modelName.slice(1)}`
    const metaFolderName = `${this.props.modelName.charAt(0).toLowerCase()}${this.props.modelName.slice(1)}`

    // Write GraphQL type filea
    this.fs.copyTpl(
      this.templatePath('graphql/types/modelName.js'),
      this.destinationPath(`graphql/types/${metaFileName}.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // Write GraphQL List Query
    this.fs.copyTpl(
      this.templatePath('graphql/queries/modelName/listModelNames.js'),
      this.destinationPath(`graphql/queries/${metaFileName}/list${metaFileName}s.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // Write GraphQL Read Query
    this.fs.copyTpl(
      this.templatePath('graphql/queries/modelName/readModelName.js'),
      this.destinationPath(`graphql/queries/${metaFileName}/read${metaFileName}.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // Write GraphQL Create Mutation
    this.fs.copyTpl(
      this.templatePath('graphql/mutations/modelName/createModelName.js'),
      this.destinationPath(`graphql/mutations/${metaFileName}/create${metaFileName}.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // Write GraphQL Update Mutation
    this.fs.copyTpl(
      this.templatePath('graphql/mutations/modelName/updateModelName.js'),
      this.destinationPath(`graphql/mutations/${metaFileName}/update${metaFileName}.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // Write GraphQL Delete Mutation
    this.fs.copyTpl(
      this.templatePath('graphql/mutations/modelName/deleteModelName.js'),
      this.destinationPath(`graphql/mutations/${metaFileName}/delete${metaFileName}.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // process.exit()


  }

}

