#!/usr/bin/env node
const mdLinks = require('./index.js');
const process = require('process');
const chalk = require('chalk');
const { arrayTemplate, statusTemplate, totalLinks } = require('./stats.js');

const arguments = process.argv.slice(2);

switch (arguments.length) {
  case 0:
    console.log(chalk.cyanBright.bold('| | ✧ ✿ • Por favor Ingresa una Ruta • ✿ ✧ | |'));
    break;
  case 1:
    mdLinks(arguments[0], { validate: false })
      .then((response) => {
        console.log(`${arrayTemplate(response)}`);
      })
      .catch((err) => console.log(chalk.redBright.bold(err)));
    break;
  case 2:
    if (arguments[1] === '--validate') {
      mdLinks(arguments[0], { validate: true })
        .then((response) => {
          console.log(`${statusTemplate(response)}`);
        })
        .catch((err) => console.log(chalk.redBright.bold(err)));
    } else if (arguments[1] === '--stats') {
      mdLinks(arguments[0], { validate: true })
        .then((response) => {
          console.log(`${totalLinks(response)}`);
        })
        .catch((err) => console.log(chalk.redBright.bold(err)));
    }
    else console.log(chalk.redBright.bold('| | ✧ ✿ • Opción Inválida • ✿ ✧ | |'));
    break;
  case 3:
    if (
      (arguments[1] === '--validate' && arguments[2] === '--stats') ||
      (arguments[1] === '--stats' && arguments[2] === '--validate')
    ) {
      mdLinks(arguments[0], { validate: true })
        .then((response) => {
          console.log(`${totalLinks(response)}`);
          console.log(`${statusTemplate(response)}`);
        })
        .catch((err) => console.log(chalk.redBright.bold(err)));
    } else console.log(chalk.redBright.bold('| | ✧ ✿ • Opción Inválida • ✿ ✧ | |'));
    break;
  default:
    console.log(chalk.redBright.bold('| | ✧ ✿ • Entrada de Datos Incorrectos• ✿ ✧ | |'));
}