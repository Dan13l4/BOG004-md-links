// Importamos Módulos de node
const{
    converterPath,
    validatePath,
    fileSearch,
    readFileContent,
    getLinks
} = require('./node-methods.js');

//node methods filesystem - path
const path = require("path");

//Función mdLinks
const mdLinks = (args) => new Promise((resolve, reject) => {

//captura de la ruta a partir del array de args
    const terminalPathCacht = args[2];
    console.log('Terminal cacht', terminalPathCacht);

//convertir ruta capturada en absoluta
    const pathAbsolute = converterPath(terminalPathCacht);
    console.log("path", pathAbsolute);

// Guardo el rersultado e invoco la función pasando como argumento pathAbsolute
    const resultValidatePath  = validatePath(pathAbsolute);
    console.log('Ruta válida?', resultValidatePath);

//Condicional que valida la ruta y la recursividad invocando la función fileSearch desde nodeMethods
const arrayFilePathMd = [];
if(resultValidatePath) {
    const filesMdResp = fileSearch(arrayFilePathMd, pathAbsolute);// invocamos la función que nos da la recursividad
    console.log('Direcciones encontradas:', filesMdResp);
}else {
    const invalidPath = 'La ruta ingresada no es válida'
    console.log(invalidPath)
}

//sin Promesa:👇
console.log('-----Lectura de los archivos:-----');
readFileContent(arrayFilePathMd);

// Con promesa:
// const readFiles = readFileContent(arrayFilePathMd)
//     .then((arrayFilePathMd) => {
//         console.log('ReadFiles desde md-links:', arrayFilePathMd);
//         resolve(readFiles);
//     })
//     .catch((error) => {
//         const errorMessage = 'Error';
//         reject(error, errorMessage);
//     });

})
module.exports = mdLinks;
