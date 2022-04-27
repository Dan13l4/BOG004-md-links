const {
    converterPath,
    validatePath,
    isDir,
    readDirFiles,
    isFileMd,
} = require("./node-methods.js");

const mdLinks = (args) => new Promise((resolve, reject) => {
    //node methods filesystem - path
    const path = require("path");

    // Captura la ruta apartir del array
    const catchedPath = args[2];

    // Confirma si la ruta es absoluta
    console.log("Es una ruta absoluta?:", path.isAbsolute(catchedPath));

    // invoca funcion converterPath
    const absolutePath = converterPath(catchedPath)
    console.log("Ruta ingresada:", absolutePath)


    // invoca funcion validatePath
    const resultValidatePath = validatePath(absolutePath)
    console.log("Es una ruta valida?:", resultValidatePath)

    // se declara array de rutas
     const pathArray = [];

    // condicional de programa si la ruta es valida
    if(resultValidatePath){ // ingresa solo si la ruta es valida
        isDir(absolutePath) // ingresa solo si es directorio
        .then((isDirResult) => {
            if(isDirResult){
            console.log('Recursividad:');
            const dirFiles = readDirFiles(absolutePath);
            resolve(dirFiles);
            // deberia retornar un array con una o mas rutas
            }else{
            console.log('GUARDA RUTA MD EN ARRAY');
            const isFileMdResult =  isFileMd(absolutePath);
            // console.log(isFileMdResult);
            pathArray.push(isFileMdResult);
            console.log(pathArray);
            // resolve(isFileMdResult);
            }
        })
        .catch((error) => {
            console.log('soy error', error);
        });
    }else{
        const invalidPath = 'Ruta no valida';
        console.log(invalidPath);
        return invalidPath;
    }
});

module.exports = mdLinks;