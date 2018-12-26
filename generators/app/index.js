'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const Sequelize = require('sequelize');
// var config = require('/../config/sequelize.js');
var config = require(__dirname + '/config/sequelize.js');

// __dirname + 
module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the groundbreaking ${chalk.red('generator-graph')} generator!`)
    );

    const prompts = [
      // {
      //   type: 'text',
      //   name: 'projectName',
      //   message: 'What is the name of the project you wish to generate?',
      //   default: "My Awesome Project"
      // },
      {
        type: 'text',
        name: 'tableName',
        message: 'Enter tablename',
        default: "users"
      },
      // {
      //   type: 'confirm',
      //   name: 'securityYn',
      //   message: 'Do you want security?',
      //   default: true
      // }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {

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



    sequelize.getQueryInterface().showAllSchemas().then((tableObj) => {

      // const tableName = tableObj[0].Tables_in_phoenix_dev
      const tableName = this.props.tableName;
      sequelize.getQueryInterface().describeTable(tableName).then((tableObject) => {
        console.log(tableName);
        console.log(tableObject['id']);


        // this.fs.copy(
        //   this.templatePath('models/user.js'),
        //   this.destinationPath('models/user.js')
        // );


        // var columnObject = tableObject[0]

        // console.log('end column')
        // console.log(tableObject);
      })
    })
      .catch((err) => {
        console.log('showAllSchemas ERROR', err);
      })

    // sequelize
    //   .authenticate()
    //   .then(() => {
    //     console.log('Connection has been established successfully.');
    //   })
    //   .catch(err => {
    //     console.error('Unable to connect to the database:', err);
    //   });


    // this.fs.copy(
    //   this.templatePath('graphql/mutations/user/createUser.js'),
    //   this.destinationPath('graphql/mutations/user/createUser.js')
    // );

    // this.fs.copy(
    //   this.templatePath('graphql/queries/user/listUsers.js'),
    //   this.destinationPath('graphql/queries/user/listUsers.js')
    // );

    // this.fs.copy(
    //   this.templatePath('graphql/queries/user/readUser.js'),
    //   this.destinationPath('graphql/queries/user/readUser.js')
    // );

    // this.fs.copy(
    //   this.templatePath('graphql/types/user.js'),
    //   this.destinationPath('graphql/types/user.js')
    // );

    // this.fs.copy(
    //   this.templatePath('migrations/20181011043121-create-users.js'),
    //   this.destinationPath('migrations/20181011043121-create-users.js')
    // );



  }

  install() {
    this.installDependencies();
  }
};
