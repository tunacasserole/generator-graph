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
        message: 'Name of the Model you wish to generate.  Must have a corresponding config meta file.',
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
    const metaFolderName = `${metaModelName.charAt(0).toLowerCase()}${metaModelName.slice(1)}`

    // Write Sequelize Model file
    // this.fs.copyTpl(
    //   this.templatePath('models/modelName.js'),
    //   this.destinationPath(`models/${`${metaModelName.charAt(0).toLowerCase()}${metaModelName.slice(1)}`}.js`),
    //   {
    //     modelName: this.props.modelName,
    //     modelAttrs: attrs
    //   }
    // );

    // Write GraphQL Index file
    this.fs.copyTpl(
      this.templatePath('graphql/index.js'),
      this.destinationPath(`graphql/index.js`)
    );

    // Write GraphQL Type file
    this.fs.copyTpl(
      this.templatePath('graphql/types/modelName.js'),
      this.destinationPath(`graphql/types/${`${metaModelName.charAt(0).toLowerCase()}${metaModelName.slice(1)}`}.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // Write GraphQL Query Index file
    this.fs.copyTpl(
      this.templatePath('graphql/queries/index.js'),
      this.destinationPath(`graphql/queries/index.js`),
      {
        modelName: this.props.modelName,
      }
    );

    // Write GraphQL List Query
    this.fs.copyTpl(
      this.templatePath('graphql/queries/modelName/listModelNames.js'),
      this.destinationPath(`graphql/queries/${metaFolderName}/list${metaModelName}s.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // Write GraphQL Read Query
    this.fs.copyTpl(
      this.templatePath('graphql/queries/modelName/readModelName.js'),
      this.destinationPath(`graphql/queries/${metaFolderName}/read${metaModelName}.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // Write GraphQL Mutations Index file
    this.fs.copyTpl(
      this.templatePath('graphql/mutations/index.js'),
      this.destinationPath(`graphql/mutations/index.js`),
      {
        modelName: this.props.modelName,
      }
    );

    // Write GraphQL Create Mutation
    this.fs.copyTpl(
      this.templatePath('graphql/mutations/modelName/createModelName.js'),
      this.destinationPath(`graphql/mutations/${metaFolderName}/create${metaModelName}.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // Write GraphQL Update Mutation
    this.fs.copyTpl(
      this.templatePath('graphql/mutations/modelName/updateModelName.js'),
      this.destinationPath(`graphql/mutations/${metaFolderName}/update${metaModelName}.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // Write GraphQL Delete Mutation
    this.fs.copyTpl(
      this.templatePath('graphql/mutations/modelName/deleteModelName.js'),
      this.destinationPath(`graphql/mutations/${metaFolderName}/delete${metaModelName}.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // process.exit()


  }

}

