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

      const columns = Object.keys(tableObject)

      const metaFileName = `${this.props.modelName.charAt(0).toLowerCase()}${this.props.modelName.slice(1)}`

      // Write Meta YML File
      this.fs.copyTpl(
        this.templatePath('config/modelName.yml'),
        this.destinationPath(`config/meta/${metaFileName}.yml`),




        // {
        //   modelAttrs: columns.join(":\r\n") + ":"
        // }
      );

      // process.exit()


    })

  }
}
