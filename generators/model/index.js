'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const helpers = require('../../lib/helpers')
const yaml = require('js-yaml');
const fs = require('fs');

module.exports = class extends Generator {

  prompting() {
    this.log(
      yosay(`Welcome to the groundbreaking ${chalk.red('generator-graph')} generator!`)
    );

    const prompts = [

      // {
      //   type: 'text',
      //   name: 'modelName',
      //   message: 'Enter model name',
      //   default: "Complaint"
      // },

    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

    // for testing set the model automatically
    this.props.modelName = "Complaint"

    console.log('--------- parsing yaml ----------------')
    
    const modelFileName = `${this.props.modelName.charAt(0).toLowerCase()}${this.props.modelName.slice(1)}.js`
    
    // Retrieve model attributes from meta file
    try {
      
      const modelMeta = yaml.safeLoad(fs.readFileSync('config/meta/complaint.yml', 'utf8'));
      const attrs = Object.entries(modelMeta)
      
      // console.log(attrs)

      this.fs.copyTpl(
        this.templatePath('models/modelName.js'),
        this.destinationPath(`models/${modelFileName}`),
        {
          modelName: this.props.modelName,
          modelAttrs: attrs
        }
        );
        
      } catch (e) {
        console.log(e);
      }

  }

  install() {
    this.installDependencies();
  }
};
