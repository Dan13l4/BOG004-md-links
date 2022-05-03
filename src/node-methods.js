//node methods filesystem - path
const fs = require("fs");
const path = require("path");
const chalk = require('chalk');

//Resuelve y normaliza la ruta dada
const converterPath = (pathToConvert) => {
  let converterPathResult;
  const pathAbsolute = path.isAbsolute(pathToConvert);
  pathAbsolute
    ? (converterPathResult = pathToConvert)
    : (converterPathResult = path.resolve(pathToConvert).normalize());
  return converterPathResult;
};

// Función para verifica si existe la ruta
const validatePath = (path) => fs.existsSync(path);

//Función recursiva para leer el contedido de un directorio
const fileSearch = (arrayPaths, fileAbsolutePath) => {
  const isDirResult = fs.statSync(fileAbsolutePath).isDirectory();
  if (isDirResult) {
    const dirFileRes = fs.readdirSync(fileAbsolutePath); //recorrer el contenido de un directorio
    dirFileRes.forEach((file) => {
      const dirAbsolutepath = path.join(fileAbsolutePath, file);
      fileSearch(arrayPaths, dirAbsolutepath);
    });
  } else {
    const fileExtensionRes = path.extname(fileAbsolutePath); //obtine .md
    if (fileExtensionRes === ".md") {
      arrayPaths.push(fileAbsolutePath);
    }
  }
  return arrayPaths;
};

//Función para Extraer Links de archivos .md
const regxLink = new RegExp (/\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg);
const regxText = new RegExp (/\[[\w\s\d.()]+\]/);
const regxUrl = new RegExp (/\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg);


const getLinks = (fileContent, arrayMds) => {
    const content = fileContent;
    const contentLinks = content.match(regxLink);
    let turnedLinksArray;
     if (contentLinks) {
      turnedLinksArray = contentLinks.map((myLinks) => {
      const myhref = myLinks.match(regxUrl).join().slice(1, -1); // URL encontradas
      const mytext = myLinks.match(regxText).join().slice(1, -1); // texto que hace ref a URL
      return {
        href: myhref,
        text: mytext,
        FileLocation: arrayMds, // ruta donde se encuentra URL
      };
    });
  }else if (contentLinks === null) {
    return [];
  }
    return turnedLinksArray;
};


// Función para leer los archivos con promsesas:
const readFilesContent = (arrayMds) => new Promise ((resolve) => {
    const arraysMds = [];
    arrayMds.forEach((element) => {
        fs.readFile(element, 'utf8', function(err, data) {
            if (err){
                const errorMessage = chalk.red.bold('| | ✧ ✿ ...No se puede leer el contenido del archivo... ✿ ✧ | |');
                console.log(errorMessage);
            }else{
                arraysMds.push(getLinks(data, element));
                if (arrayMds.length === arraysMds.length) {
                  resolve(arraysMds.flat());                  
                }
            }
        });
    })
});

module.exports = {
  converterPath,
  validatePath,
  fileSearch,
  readFilesContent,
  getLinks,
};