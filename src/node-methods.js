// node methods filesystem - path
const fs = require('fs');
const path = require("path");

// verifica si existe la ruta
const validatePath = (path) => fs.existsSync(path);


// funcion para convertir ruta capturada a una ruta absoluta
const converterPath = (pathToConvert) => {
    let pathToConvertResult;
    path.isAbsolute(pathToConvert) ? pathToConvertResult = pathToConvert : pathToConvertResult = path.resolve(pathToConvert).normalize();
    return pathToConvertResult;
};

// funcion para verificar si es un directorio
const isDir = (pathToCheck) => new Promise((resolve) => {
    fs.stat(pathToCheck, (err, stat) =>{
        if (err) throw err;
        const isDirResult = stat.isDirectory();
        console.log("Soy un directorio?:", isDirResult);
        resolve(isDirResult);
    });
});

// funcion para revisar si es archivo md y leer su contenido
const isFileMd = (filePath) => {
    const fileExtensionResult = fileExtension(filePath);
    if(fileExtensionResult === '.md'){
        return filePath;
    }else{
        const isFileMdError = 'Archivo no tiene extención .md';
        return isFileMdError;
    }
};

// funcion para revisar extencion de archivo
const fileExtension = (filePath) => {
    const extension = path.extname(filePath);
    return extension;
}

// funcion para revisar documentos del directorio
const readDirFiles = (pathToCheckContent) =>{
    const dirFiles = fs.readdirSync(pathToCheckContent);
    console.log("Contenido del directorio:", dirFiles);
    return dirFiles;
};

// funcion para leer contenido de un archivo
const readFileContent = (pathToRead) => {
    fs.readFile(pathToRead, 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data);
        return data; 
    });
}


module.exports = {
    converterPath,
    validatePath,
    isDir,
    readDirFiles,
    isFileMd,
};