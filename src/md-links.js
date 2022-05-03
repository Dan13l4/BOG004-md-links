// Importamos Módulos de node
const{
    converterPath,
    validatePath,
    fileSearch,
    readFilesContent,
} = require('./node-methods.js');

const chalk = require('chalk');

//Función mdLinks
const mdLinks = (args) => new Promise((resolve, reject) => {

//captura de la ruta a partir del array de args
    const terminalPathCacht = args[2];

//convertir ruta capturada en absoluta
    const pathAbsolute = converterPath(terminalPathCacht);
    console.log(chalk.cyan.bold('| | ✧ ✿ ...Ruta ingresada:... ✿ ✧ | |'), pathAbsolute);

// Guardo el rersultado e invoco la función pasando como argumento pathAbsolute
    const resultValidatePath  = validatePath(pathAbsolute);
    console.log(chalk.cyan.bold('| | ✧ ✿ ...Es una ruta valida?:... ✿ ✧ | |'), resultValidatePath);

//Condicional que valida la ruta y la recursividad invocando la función fileSearch desde nodeMethods
    let arrayFilePathMd = [];
    if(resultValidatePath) {
        const filesMdResp = fileSearch(arrayFilePathMd, pathAbsolute);// invocamos la función que nos da la recursividad
        if(filesMdResp.length === 0) {
            console.log(chalk.red.bold('| | ✧ ✿ ...No hay archivos md encontrados... ✿ ✧ | |'));
        }else{
            console.log(chalk.cyan.bold('| | ✧ ✿ ...Archivos encontrados:... ✿ ✧ | |'), filesMdResp);
        }
    }else{
        const invalidPath = chalk.red.bold('| | ✧ ✿ ...La ruta ingresada no es válida... ✿ ✧ | |');
        console.log(invalidPath);
    }

// Lecutra de los archivos:
    readFilesContent(arrayFilePathMd)
    .then((objectLinks)=>{
        if(objectLinks.length === 0){
            console.log(chalk.red.bold('| | ✧ ✿ ...No se han encontrado links dentro del archivo md... ✿ ✧ | |'));
        }else{
            console.log(chalk.cyan.bold('| | ✧ ✿ ...Lectura de los archivos:... ✿ ✧ | |'));
            console.log(chalk.blueBright.bold('| | ✧ ✿ ...Links obtenidos:... ✿ ✧ | |'));
            resolve(objectLinks);
        }
    })
    .catch((error)=>{
        const errorMessage = 'Error'
        reject(error, errorMessage)
    });

})

module.exports = mdLinks;
