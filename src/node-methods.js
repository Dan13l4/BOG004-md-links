    //node methods filesystem - path
    const fs = require('fs');
    const path = require("path");

//Resuelve y normaliza la ruta dada
const converterPath = (pathToConvert) => {
    let converterPathResult;
    const pathAbsolute = path.isAbsolute(pathToConvert) 
    console.log('Soy una ruta absoluta?', pathAbsolute);
    pathAbsolute
        ? converterPathResult = pathToConvert 
        : converterPathResult = path.resolve(pathToConvert).normalize();
    return converterPathResult;
}

// Función para verifica si existe la ruta
const validatePath = (path) => fs.existsSync(path);


//Función recursiva para leer el contedido de un directorio
const fileSearch = (arrayPaths, fileAbsolutePath) =>{
    const isDirResult = fs.statSync(fileAbsolutePath).isDirectory();
    if(isDirResult){
        const dirFileRes = fs.readdirSync(fileAbsolutePath); //recorrer el contenido de un directorio
        dirFileRes.forEach((file) => {
            const dirAbsolutepath = path.join(fileAbsolutePath, file);
            fileSearch(arrayPaths, dirAbsolutepath);
        });
    }else{
        const fileExtensionRes = path.extname(fileAbsolutePath);//obtine .md
        if(fileExtensionRes === '.md'){
            arrayPaths.push(fileAbsolutePath);
        }
    }
    return arrayPaths;
}

// Sin Promesa:

// const readFilesContent = (pathToRead) => {
//     pathToRead.forEach((element) => {
//         fs.readFile(element, 'utf8', function(err, data) {
//         if (err){
//             const errorMessage = ' No se puede leer el conbtenido del archivo';
//             console.log(errorMessage);
//         }else{
//             console.log(data);
//             // resolve (data);
//         }
//         });
//     })
// };

// Con Promesa:

const readFilesContent = (pathToRead) => new Promise ((resolve) => {
    pathToRead.forEach((element) => {
        fs.readFile(element, 'utf8', function(err, data) {
        if (err){
            const errorMessage = ' No se puede leer el conbtenido del archivo';
            console.log(errorMessage);
        }else{
            // console.log(data);
            resolve(data);
        }
        });
    })
});




module.exports = {
    converterPath,
    validatePath,
    fileSearch,
    readFilesContent,
}