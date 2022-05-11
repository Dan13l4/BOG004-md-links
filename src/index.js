// Importamos Módulos de node
const {
    converterPath,
    validatePath,
    fileSearch,
    readFilesContent,
    httpPetitionStatus,
  } = require('./node-methods.js');
  
  // Se importa Librería chalk
  const chalk = require('chalk');
  
  // Función mdLinks
  const mdLinks = (path, options = {validate:false}) => new Promise((resolve, reject) => {
  
  // Se convierte la ruta capturada en absoluta
      const pathAbsolute = converterPath(path);

  // Guardo el rersultado e invoco la función pasando como argumento pathAbsolute
      const resultValidatePath = validatePath(pathAbsolute);
  
  // Condicional que valida la ruta y la recursividad invocando la función fileSearch desde nodeMethods
      let arrayFilePathMd = [];
      if(resultValidatePath === false){
        reject(chalk.redBright('| | ✧ ✿ ...The path entered is not valid... ✿ ✧ | |'))
      }else if(resultValidatePath){
        const filesMd = fileSearch(arrayFilePathMd, pathAbsolute) // invocamos la función que nos da la recursividad
        if (filesMd.length === 0){
          reject(chalk.red.bold('| | ✧ ✿ ...No md files found or file is not md... ✿ ✧ | |'));
          }else{
            readFilesContent(arrayFilePathMd) // Invocamos la funcion readFiles 
            .then((objectLinks)=>{
              if (objectLinks.length === 0) {
                reject(chalk.red.bold('| | ✧ ✿ ...No links found inside md file... ✿ ✧ | |'));
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