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

//Función recursiva para leer el contenido de un directorio
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
    // revisa el contenido del archivo para capturar links
    const contentLinks = content.match(regxLink);
    let turnedLinksArray;
     if (contentLinks) {
       // se transforma array de linksArray para entregar la forma de objeto
      turnedLinksArray = contentLinks.map((myLinks) => {
      const myhref = myLinks.match(regxUrl).join().slice(1, -1); // URL encontradas
      const mytext = myLinks.match(regxText).join().slice(1, -1); // texto que hace ref a URL
      return {
        href: myhref,
        text: mytext,
        FileLocation: arrayMds, // ruta donde se encuentra URL
      };
    });
    //En caso que el archivo no tenga un link se enviara un array vacio
  }else if (contentLinks === null) {
    return [];
  }
    return turnedLinksArray;
};


// Función para leer los archivos:
const readFilesContent = (arrayMds) => new Promise ((resolve) => {
    const arraysMds = [];
    arrayMds.forEach((element) => {
        fs.readFile(element, 'utf8', function(err, data) {
            if (err){
                const errorMessage = chalk.red.bold('| | ✧ ✿ ...No se puede leer el contenido del archivo... ✿ ✧ | |');
                console.log(errorMessage);
            }else{
                arraysMds.push(getLinks(data, element));
                // cuando el array tenga la misma cantidad de objetos los resuelve para mostrarlos todos
                if (arrayMds.length === arraysMds.length) {
                  resolve(arraysMds.flat());                  
                }
            }
        });
    })
});

// readFilesContent lea un solo archivo
// en mdlinks llamamos al array de archivos, y por cada archivo llamamos la promesa readFilesContent

module.exports = {
  converterPath,
  validatePath,
  fileSearch,
  readFilesContent,
  getLinks,
};