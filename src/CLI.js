#!/usr/bin/env node
//se importa la función md-links
const mdLinks = require('./index.js');
const finalOutput = require("./utils.js")
const process = require('process');
const chalk = require('chalk');
const { resolve } = require('path');


//Captura argumentos desde la Terminal
const pathArg = process.argv[2];
const optionsArg = {};

if(process.argv.includes('--validate')){
  optionsArg.validate = true;
}

if (process.argv.includes('--stats')) {
  optionsArg.stats = true;
}

// array de argumentos para evaluacion de options
const terminalArg = [pathArg];

if (optionsArg.validate === true) {
  terminalArg.push('--validate');
}
  
if (optionsArg.stats === true) {
  terminalArg.push('--stats');
}

// se invoca función cliFuntion
const cliFuntion = () => {
  mdLinks(pathArg, optionsArg)
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.log(error);
  });
 }
cliFuntion();
