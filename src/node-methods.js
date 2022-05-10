//node methods filesystem - path
const fs = require("fs");
const path = require("path");
const chalk = require('chalk');

//Se importa Fetch para realizar la petición HTTP
// import fetch from 'node-fetch';
// const fetch = require('node-fetch')

/**
 * @param {*} arrObjLinks
 * @param {*} pathToConvert 
 * @returns 
 */
 const { default: fetch } = require("node-fetch");
 const { runInContext } = require("vm");


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
      if (dirFileRes) fileSearch(arrayPaths, dirAbsolutepath);
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
const getLinks = (fileContent, pathMdList) => new Promise((resolve)=>{
  const regxLink = new RegExp(/\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/gm);
  const regxUrl = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/gm;
  const regxText = /\[[\w\s\d.()]+\]/;
  const content = fileContent;
  const contentLinks = content.match(regxLink);
  if (contentLinks) {
    const objLinks = contentLinks.map((links) => {
      const linkHref = links.match(regxUrl).join().slice(1, -1);
      const linkText = links.match(regxText).join().slice(1, -1);
      return {
        href: linkHref,
        text: linkText.substring(0, 50),
        file: pathMdList,
      };
    });
    resolve(objLinks);
  } else if (contentLinks === null) {
    resolve([])
  }
});



// Función para leer los archivos:
const readFilesContent = (pathMdList) => new Promise((resolve) => {
  const arrMds = [];
    pathMdList.map((element) => {
      fs.readFile(element, "utf8", function (err, data) {
      if (err) {
        const errorMessage = '| | ✧ ✿ ...No se puede leer el contenido del archivo... ✿ ✧ | |';
        console.log(chalk.red.bold(errorMessage));
      } else {
      getLinks(data, element)
      .then((resArray)=>{
          arrMds.push(resArray)
          if (arrMds.length === pathMdList.length) {
            resolve(arrMds.flat());
          }
        })
      }
    });
  });
});

// readFilesContent lea un solo archivo
// en mdlinks llamamos al array de archivos, y por cada archivo llamamos la promesa readFilesContent


// Función para hacer la petición HTTP:
const httpPetitionStatus = (arrObjLinks) => {
  const arrPromise = arrObjLinks.map((obj) => fetch(obj)
      .then(() => ({
        href: obj.href,
        text: obj.text,
        file: obj.file,
        status: 200,
        statusText: 'OK'
      }))
      .catch(() => ({
        href: obj.href,
        text: obj.text,
        file: obj.file,
        status: 404,
        statusText: 'FAIL'
      })));
  return Promise.all(arrPromise);
};

// funcion output con --stats
const outputWithS = (arrObjLinks) => {
  const totalLinks = arrObjLinks.length;
  const unique = [...new Set(arrObjLinks.map((obj) => obj.href))];
  const uniqueLinks = unique.length;
  console.log(chalk.cyan.bold("| | ✧ ✿ ...Stats:... ✿ ✧ | |"))
  console.table({ TOTAL: totalLinks, UNIQUE: uniqueLinks });
};

// funcion output con --stats y con --validate
const outputWithVS = (arrObjLinks) => {
  const totalLinks = arrObjLinks.length;
  const unique = [...new Set(arrObjLinks.map((obj) => obj.href))];
  const uniqueLinks = unique.length;
  const broken = arrObjLinks.filter((obj) => {
    console.log(obj)
    return obj.status !== '200'
  });
  const brokenLinks = broken.length;
  console.log(chalk.cyan.bold("| | ✧ ✿ ...Stats con Validate:... ✿ ✧ | |"))
  console.table({ TOTAL: totalLinks, UNIQUE: uniqueLinks, BROKEN: brokenLinks });
};


module.exports = {
  converterPath,
  validatePath,
  fileSearch,
  readFilesContent,
  getLinks,
  httpPetitionStatus,
  outputWithS,
  outputWithVS,
};