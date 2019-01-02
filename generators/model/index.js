'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

  prompting() {
    this.log(
      yosay(`Welcome to the groundbreaking ${chalk.red('generator-graph')} generator!`)
    );

    const prompts = [

      {
        type: 'text',
        name: 'modelName',
        message: 'Enter model name',
        default: "Complaint"
      },

    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    // Retrieve model attributes from meta file
    const modelAttrs = ['id', 'name']

    // Write Model File
    const modelFileName = `${this.props.modelName.charAt(0).toLowerCase()}${this.props.modelName.slice(1)}.js`

    this.fs.copyTpl(
      this.templatePath('models/modelName.js'),
      this.destinationPath(`models/${modelFileName}`),
      {
        modelName: this.props.modelName,
        modelAttrs: modelAttrs
      }
    );

  }

  install() {
    this.installDependencies();
  }
};
