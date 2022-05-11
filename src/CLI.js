#!/usr/bin/env node
const mdLinks = require('./index.js');
const process = require('process');
const chalk = require('chalk');
// Se exportan las funciones de stats
const { arrayTemplate, statusTemplate, totalLinks, totalLinksBroken } = require('./stats.js');

const arguments = process.argv.slice(2);

switch (arguments.length) {
  case 0:
    // En caso que se ejecute y el usuario no ponga un link se le mandara un error
    console.log(chalk.cyanBright.bold('| | ✧ ✿ • Please enter a route • ✿ ✧ | |'));
    break;
  case 1:
    // En caso de que el usuario inicie el programa y no ingrese ninguna option se le mandara 
    // el archivo normal sin estatus ni validacion
    mdLinks(arguments[0], { validate: false })
      .then((response) => {
        console.log(`${arrayTemplate(response)}`);
      })
      .catch((err) => console.log(chalk.redBright.bold(err)));
    break;
  case 2:
    // En caso que el usuario ingrese el validate se le enviara los link encontrados con el options
    if ((arguments[1] === '--validate') || (arguments[1] === '--v')){
      mdLinks(arguments[0], { validate: true })
        .then((response) => {
          console.log(`${statusTemplate(response)}`);
        })
        .catch((err) => console.log(chalk.redBright.bold(err)));
    } else if ((arguments[1] === '--stats') || (arguments[1] === '--s')) {
      // Si el usuario ingresa stats se le enviara los estados de los links
      mdLinks(arguments[0], { validate: true })
        .then((response) => {
          console.log(`${totalLinks(response)}`);
        })
        .catch((err) => console.log(chalk.redBright.bold(err)));
    }
    // Si el usuario ingresa una opcion invalida se le envia un error
    else console.log(chalk.redBright.bold('| | ✧ ✿ • Invalid Option • ✿ ✧ | |'));
    break;
  case 3:
    if (
      // Si el usuario ingresa los dos options se envian las estadisticas y la validacion
      (arguments[1] === '--validate' && arguments[2] === '--stats') ||
      (arguments[1] === '--stats' && arguments[2] === '--validate') ||
      (arguments[1] === '--v' && arguments[2] === '--s') ||
      (arguments[1] === '--s' && arguments[2] === '--v')
    ) {
      mdLinks(arguments[0], { validate: true })
        .then((response) => {
          console.log(`${totalLinksBroken(response)}`);
        })
        .catch((err) => console.log(chalk.redBright.bold(err)));
    } else console.log(chalk.redBright.bold('| | ✧ ✿ • Invalid Option • ✿ ✧ | |'));
    break;
  default:
    console.log(chalk.redBright.bold('| | ✧ ✿ •  Incorrect Data Entry • ✿ ✧ | |'));
}