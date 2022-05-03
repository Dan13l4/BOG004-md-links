#!/usr/bin/env node
const process = require("process");
const mdLinks = require("./md-links.js");
const terminalArg = process.argv;

const cliEnojado = () => {
    mdLinks(terminalArg)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
}

cliEnojado();