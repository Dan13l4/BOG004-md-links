const mdLinks = require('../src/index.js');

const path = 'test/doc-test';

const mdFilePath = 'test/doc-test/prueba.md';
const invalidpath = 'test/doc-test/prueba7.md';
const routeWithoutLinks = 'test/doc-test/prueba4.md';
const pathNoFile = 'test/doc-test/doc3-test';

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

const arrObjLinksValidated = [
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
     return mdLinks(mdFilePath, {validate:true}).then(e => expect(e).toEqual(arrObjLinksValidated))
  });

  it('Should return an array of unvalidated link objects', () => {
    return mdLinks(mdFilePath, {validate:false}).then(e => expect(e).toEqual(arrObjLinks))
  })

  it('Should return an error because the path is invalid', () => {
    return mdLinks(invalidpath, {validate:true}).catch(e => expect(e).toMatch("| | ✧ ✿ ...The path entered is not valid... ✿ ✧ | |"))
  })

  it('Should return an error because there are no links inside the md file', () => {
    return mdLinks(routeWithoutLinks, {validate:true}).catch(e => expect(e).toMatch("| | ✧ ✿ ...No links found inside md file... ✿ ✧ | |"))
  })

  it('Should return an error because there are no md files inside the folder', () => {
    return mdLinks(pathNoFile, {validate:true}).catch(e => expect(e).toMatch("| | ✧ ✿ ...No md files found or file is not md... ✿ ✧ | |"))
  })
});
