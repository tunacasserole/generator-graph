'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

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

    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });

  }

  writing() {
    
    var config = require(this.destinationRoot() + '/config/sequelize.js');

    var sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        // DB Options
        dialect: 'mysql',
        host: config.host,

        // Global Options
        paranoid: true
      });
      
    sequelize.getQueryInterface().describeTable(this.props.tableName).then((tableObject) => {

      const columns = Object.entries(tableObject)

      // Write Meta YML File
      this.fs.copyTpl(
        this.templatePath('config/modelName.yml'),
        this.destinationPath(`config/meta/${this.props.tableName}.yml`),
        {
          modelAttrs: columns
        }
        );
        
      // process.exit()

    })

  }
}
