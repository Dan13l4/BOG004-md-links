// Importamos Módulos de node
const{
    converterPath,
    validatePath,
    fileSearch,
    readFilesContent,
    httpPetitionStatus,
    outputWithS,
    outputWithVS
} = require('./node-methods.js');

// Importamos el chalk para crear estilos en los console.log
const chalk = require('chalk');

//Función mdLinks
const mdLinks = (path, options = {validate:false, stats:false}) => new Promise((resolve, reject) => {

//convertir ruta capturada en absoluta
    const pathAbsolute = converterPath(path);
    console.log(chalk.cyan.bold('| | ✧ ✿ ...Ruta ingresada:... ✿ ✧ | |'), pathAbsolute);

// Guardo el rersultado e invoco la función pasando como argumento pathAbsolute
    const resultValidatePath = validatePath(pathAbsolute);
    console.log(chalk.cyan.bold('| | ✧ ✿ ...Es una ruta valida?:... ✿ ✧ | |'), resultValidatePath);

//Condicional que valida la ruta y la recursividad invocando la función fileSearch desde nodeMethods
    let arrayFilePathMd = [];
    if(resultValidatePath) {
        const filesMdResp = fileSearch(arrayFilePathMd, pathAbsolute);// invocamos la función que nos da la recursividad
        if(filesMdResp.length === 0) {
            console.log(chalk.red.bold('| | ✧ ✿ ...No hay archivos md encontrados... ✿ ✧ | |'));
        }else{
            // muestra una lista de todos los md
            console.log(chalk.cyan.bold('| | ✧ ✿ ...Archivos encontrados:... ✿ ✧ | |'), filesMdResp);
        }
    }else{
        // No se encuentra ningun archivo
        const invalidPath = chalk.red.bold('| | ✧ ✿ ...La ruta ingresada no es válida... ✿ ✧ | |');
        console.log(invalidPath);
    }

// Lecutra de los archivos:
// Llamamos la funcion de readFiles y creamos la funcion de la promesa
    readFilesContent(arrayFilePathMd)
    .then((objectLinks)=>{
        // Si pasa la promesa se usan condicionales para los diferentes casos
        if(objectLinks.length === 0){
            // Si dentro del md no hay links manda este error
            console.log(chalk.red.bold('| | ✧ ✿ ...No se han encontrado links dentro del archivo md... ✿ ✧ | |'));
        }else{
            // Si se encuentran links se crea otra lista de condicionales
            console.log(chalk.blueBright.bold('| | ✧ ✿ ...Links obtenidos:... ✿ ✧ | |'));
            if(options.validate === true && options.stats === true){
                console.log("tengo que caer aqui ajua")
                httpPetitionStatus(objectLinks).then(respuest => console.log('HOLA', outputWithVS(respuest)))
                // outputWithVS(objectLinks)
              }else if(options.stats === true){
                  // Si stats es true, trae la funcion que nos muestra cuandos links hay y los muestra en recuadro
                  outputWithS(objectLinks)
              }else if(options.validate === true){
                httpPetitionStatus(objectLinks).then(response => {
                    resolve(response);
                })
              }else{
                resolve(objectLinks);
              }
        }
    })
    .catch((error)=>{
        const errorMessage = 'Error'
        reject(error, errorMessage)
    });

});

module.exports = mdLinks;