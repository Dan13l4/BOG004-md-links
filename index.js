//se importa la función md-links
const mdLinks = require('./src/links.js')
// node methods process
const process = require('process');
const arguments = process.argv;

//Se invoca la función
mdLinks(arguments);
