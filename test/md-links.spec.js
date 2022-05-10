const mdLinks = require('../src/index.js');

const path = 'test/doc-test';

const rutaArchivoMd = 'test/doc-test/prueba.md';
const rutaInvalida = 'test/doc-test/prueba7.md';
const rutaSinLinks = 'test/doc-test/prueba4.md';
const rutaSinArchivo = 'test/doc-test/doc3-test';

const arrObjLinks = [
  {
    href: 'https://github.com/Laboratoria/BOG004-md-links',
    text: 'Link readme laboratoria',
    file: 'C:\\Users\\57322\\Documents\\GitHub\\Proyectos Laboratoria\\BOG004-md-links\\test\\doc-test\\prueba.md'
  },
  {
    href: 'https://www.lego.com/es-es/404',
    text: 'Lego',
    file: 'C:\\Users\\57322\\Documents\\GitHub\\Proyectos Laboratoria\\BOG004-md-links\\test\\doc-test\\prueba.md'
}];

const arrObjLinksValidados = [
  {
    href: 'https://github.com/Laboratoria/BOG004-md-links',
    text: 'Link readme laboratoria',
    file: 'C:\\Users\\57322\\Documents\\GitHub\\Proyectos Laboratoria\\BOG004-md-links\\test\\doc-test\\prueba.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://www.lego.com/es-es/404',
    text: 'Lego',
    file: 'C:\\Users\\57322\\Documents\\GitHub\\Proyectos Laboratoria\\BOG004-md-links\\test\\doc-test\\prueba.md',
    status: 404,
    ok: 'fail'
  }];

describe('mdLinks', () => {
	it('Should be a function', () => {
		expect(typeof mdLinks).toBe('function');
	});

  it('Should return a promise', () =>{
    expect(mdLinks(path)instanceof Promise).toBeTruthy()
  });

  it('Should return an array of validated links objects', () => {
     return mdLinks(rutaArchivoMd, {validate:true}).then(e => expect(e).toEqual(arrObjLinksValidados))
  });

  it('Should return an array of unvalidated link objects', () => {
    return mdLinks(rutaArchivoMd, {validate:false}).then(e => expect(e).toEqual(arrObjLinks))
  })

  it('Should return an error because the path is invalid', () => {
    return mdLinks(rutaInvalida, {validate:true}).catch(e => expect(e).toMatch("| | ✧ ✿ ...La ruta ingresada no es válida... ✿ ✧ | |"))
  })

  it('Should return an error because there are no links inside the md file', () => {
    return mdLinks(rutaSinLinks, {validate:true}).catch(e => expect(e).toMatch("| | ✧ ✿ ...No se han encontrado links dentro del archivo md... ✿ ✧ | |"))
  })

  it('Should return an error because there are no md files inside the folder', () => {
    return mdLinks(rutaSinArchivo, {validate:true}).catch(e => expect(e).toMatch("| | ✧ ✿ ...No hay archivos md encontrados o el archivo no es md... ✿ ✧ | |"))
  })
});
