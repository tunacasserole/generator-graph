'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = class extends Generator {

  prompting() {

    this.log(
      yosay(`Welcome to the groundbreaking ${chalk.red('generator-graph')} generator!`)
    );

    const prompts = [

      {
        type: 'text',
        name: 'model_name',
        message: 'Name of the model you wish to generate.',
        default: "Complaint"
      },

      {
        type: 'text',
        name: 'table_name',
        message: 'Name of the table (must have a corresponding meta file of the same name).',
        default: "complaints"
      },


    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });

  }

  writing() {
    const table_name = this.props.table_name
    const model_name = this.props.model_name
    const model_nameLower = model_name.charAt(0).toLowerCase() + model_name.slice(1)
    const columnList = yaml.safeLoad(fs.readFileSync('config/meta/' + table_name + '.yml', 'utf8'));
    const attributes = Object.entries(columnList)

    // // Sequelize Model file
    // this.fs.copyTpl(
    //   this.templatePath('models/model.js'),
    //   this.destinationPath(`models/${model_nameLower}.js`),
    //   {
    //     model_name: model_name,
    //     table_name: table_name,
    //     attributes: attributes.slice(1)
    //   }
    // );

    // // GraphQL Index file
    // this.fs.copyTpl(
    //   this.templatePath('graphql/index.js'),
    //   this.destinationPath(`graphql/index.js`)
    // );

    // GraphQL Type file
    this.fs.copyTpl(
      this.templatePath('graphql/types/model_name_type.rb'),
      this.destinationPath(`app/graphql/types/${table_name.slice(0,-1)}_type.rb`),
      {
        model_name: model_name,
        attributes: attributes
      }
    );

    // // GraphQL Query Index file
    // this.fs.copyTpl(
    //   this.templatePath('graphql/queries/index.js'),
    //   this.destinationPath(`graphql/queries/index.js`),
    //   {
    //     model_name: model_name,
    //   }
    // );

    // // GraphQL Mutations Index file
    // this.fs.copyTpl(
    //   this.templatePath('graphql/mutations/index.js'),
    //   this.destinationPath(`graphql/mutations/index.js`),
    //   {
    //     model_name: model_name,
    //   }
    // );

    // // GraphQL List Query
    // this.fs.copyTpl(
    //   this.templatePath('graphql/queries/model_name/listmodel_names.js'),
    //   this.destinationPath(`graphql/queries/${model_nameLower}/list${model_name}s.js`),
    //   {
    //     model_name: model_name,
    //     attributes: attributes
    //   }
    // );

    // // GraphQL Read Query
    // this.fs.copyTpl(
    //   this.templatePath('graphql/queries/model_name/readmodel_name.js'),
    //   this.destinationPath(`graphql/queries/${model_nameLower}/read${model_name}.js`),
    //   {
    //     model_name: model_name,
    //     attributes: attributes
    //   }
    // );

    // // GraphQL Create Mutation
    // this.fs.copyTpl(
    //   this.templatePath('graphql/mutations/model_name/createmodel_name.js'),
    //   this.destinationPath(`graphql/mutations/${model_nameLower}/create${model_name}.js`),
    //   {
    //     model_name: model_name,
    //     attributes: attributes
    //   }
    // );

    // // GraphQL Update Mutation
    // this.fs.copyTpl(
    //   this.templatePath('graphql/mutations/model_name/updatemodel_name.js'),
    //   this.destinationPath(`graphql/mutations/${model_nameLower}/update${model_name}.js`),
    //   {
    //     model_name: model_name,
    //     attributes: attributes
    //   }
    // );

    // // GraphQL Delete Mutation
    // this.fs.copyTpl(
    //   this.templatePath('graphql/mutations/model_name/deletemodel_name.js'),
    //   this.destinationPath(`graphql/mutations/${model_nameLower}/delete${model_name}.js`),
    //   {
    //     model_name: model_name,
    //     attributes: attributes
    //   }
    // );
  }

}

