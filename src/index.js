// Importamos Módulos de node
const {
    converterPath,
    validatePath,
    fileSearch,
    readFilesContent,
    httpPetitionStatus,
  } = require('./node-methods.js');
  
  //--------- Se importa Librería chalk --------- 👇
  const chalk = require('chalk');
  
  //--------- Función mdLinks 👇 ---------
  const mdLinks = (path, options = {validate:false}) => new Promise((resolve, reject) => {
  
  //--------- convertir ruta capturada en absoluta 👇 ---------
      const pathAbsolute = converterPath(path);
  //--------- Guardo el rersultado e invoco la función pasando como argumento pathAbsolute 👇---------
      const resultValidatePath = validatePath(pathAbsolute);
  
      //--------- Condicional que valida la ruta y la recursividad invocando la función fileSearch desde nodeMethods 👇---------
      let arrayFilePathMd = [];
      if(resultValidatePath === false){
        reject(chalk.redBright('| | ✧ ✿ ...La ruta ingresada no es válida... ✿ ✧ | |'))
      }else if(resultValidatePath){
        const filesMd = fileSearch(arrayFilePathMd, pathAbsolute) // 👈 invocamos la función que nos da la recursividad
        if (filesMd.length === 0){
          reject(chalk.red.bold('| | ✧ ✿ ...No hay archivos md encontrados o el archivo no es md... ✿ ✧ | |'));
          }else{
            readFilesContent(arrayFilePathMd) //👈 Invocamos la funcion readFiles 
            .then((objectLinks)=>{
              if (objectLinks.length === 0) {
                reject(chalk.red.bold('| | ✧ ✿ ...No se han encontrado links dentro del archivo md... ✿ ✧ | |'));
              } else {
                if (options.validate === true) {
                  httpPetitionStatus(objectLinks).then(response => {
                    resolve(response)
    
                  })
                } else {
                  resolve(objectLinks);
                }
              }
            })
          }
      }
  
    });
  
  module.exports = mdLinks;