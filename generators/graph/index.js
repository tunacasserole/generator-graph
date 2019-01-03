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
        name: 'tableName',
        message: 'Name of the table from which to rip meta.',
        default: "complaints"
      },

      {
        type: 'text',
        name: 'modelName',
        message: 'Name of the model meta you wish to create.',
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

    const metaFileName = `${this.props.modelName.charAt(0).toLowerCase()}${this.props.modelName.slice(1)}`

    // Write GraphQL type filea
    
    this.fs.copyTpl(
      this.templatePath('graphql/types/modelName.js'),
      this.destinationPath(`graphql/types/${metaFileName}.js`),
      {
        modelName: this.props.modelName,
        modelAttrs: attrs
      }
    );

    // process.exit()


  }

}

