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
        name: 'table_name',
        message: 'Name of the table from which to rip meta.',
        default: "complaints"
      },

    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });

  }

  writing() {
    
    // var config = require(this.destinationRoot() + '/config/database.yml');
    const config = yaml.safeLoad(fs.readFileSync(this.destinationRoot() + '/config/database.yml', 'utf8'));
    console.log(config['development'])
    
    var sequelize = new Sequelize(
      config['development'].database,
      config['development'].username,
      config['development'].password,
      {
        // DB Options
        dialect: 'mysql',
        host: config.host,

        // Global Options
        paranoid: true
      });
      
    sequelize.getQueryInterface().describeTable(this.props.table_name).then((tableObject) => {

      const columns = Object.entries(tableObject)

      // Write Meta YML File
      this.fs.copyTpl(
        this.templatePath('config/modelName.yml'),
        this.destinationPath(`config/meta/${this.props.table_name}.yml`),
        {
          attributes: columns
        }
        );
        
      // process.exit()

    })

  }
}
