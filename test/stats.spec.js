const { arrayTemplate, statusTemplate, totalLinks } = require('../src/stats.js');

const arrObjetosValidados = [
  {
    href: 'https://www.facebook.com/',
    text: 'Fb',
    file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\carpeta1\\carpeta5\\markdown3.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://www.tikok.com/es',
    text: 'Tiktok',
    file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\carpeta1\\carpeta5\\markdown3.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'https://www.facebook.com/',
    text: 'facebook',
    file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\carpeta1\\markdown1.md',
    status: 200,
    ok: 'OK'
  },
  {
    href: 'http://dominioparablog.com/',
    text: 'Google',
    file: 'C:\\Users\\Jocelyn\\Desktop\\bootcamp\\LIM016-md-links\\prueba\\carpeta1\\markdown1.md',
    status: 404,
    ok: 'FAIL'
  }
];

// TEST PARA FUNCION OBTENER TOTAL DE LINKS
describe('Obtener cantidad total de links', () => {
  it('Debería ser una función', () => {
    expect(typeof totalLinks).toBe('function');
  });
});

// TEST PARA LA FUNCION DE OBTENER LA CANTIDAD DE LINKS UNICOS
describe('Obtener cantidad de links unicos', () => {
  it('Debería ser una función', () => {
    expect(typeof arrayTemplate).toBe('function');
  });
});

// TEST PARA LA FUNCION DE OBTENER LA CANTIDAD DE LINKS ROTOS
describe('Obtener cantidad de links rotos', () => {
  it('Debería ser una función', () => {
    expect(typeof statusTemplate).toBe('function');
  });
});