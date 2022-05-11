# ✨Markdown Links✨

## Index

* [1. Project summary](#1-project-summary)
* [2. Flowchart](#2-flowchart)
* [3. Installation and use of the library](#3-installation-and-use-of-the-library)
* [4. Learning objectives](#4-learning-objectives)

***

### 1. Project summary

This library was designed to read files with extension ".md" (markdown) and extract all links, within the directory path provided by the user. In order that the user can visualize which link is still up or which ones are down. In this project I made use of two libraries which are chalk and fetch.

***

### 2. Flowchart

The idea of this flowchart was to organize for the creation of the project, I will leave the img so that you can observe the two diagrams. 

## Api
![API](imgReadme/JavaScript%20API.jpg)

## CLI
![CLI](imgReadme/cli.jpg)


***

### 3. Installation and use of the library

To install the package, execute the following command:
```javascript
npm install md-links-kdbaron
```

This application can be executed through the terminal with the following structure:

Only with the path:  ```md-links <PATH>```
![path](imgReadme/pathSolo.PNG)

Path with stats option: ```md-links <PATH> --stats``` or ```md-links <PATH> --s```
![stats](imgReadme/pathS.PNG)

Path with validation option: ```md-links <PATH> --validate``` or ```md-links <PATH> --v```
![validate](imgReadme/pathV.PNG)

Path with validation option and statistics: ```md-links <PATH> --validate --stats``` or ```md-links <PATH> --stats --validate```
![vs](imgReadme/pathVS.PNG)

***

### 4. Learning objectives

Reflect and then mark the objectives that you have come to understand and apply in your project. Think about that when deciding your work strategy.

### JavaScript

- [x] **Diferenciar entre tipos de datos primitivos y no primitivos**

- [x] **Arrays (arreglos)**

- [x] **Objetos (key, value)**

- [x] **Uso de condicionales (if-else, switch, operador ternario, lógica booleana)**

- [x] **Funciones (params, args, return)**

- [x] **Recursión o recursividad**

- [x] **Módulos de CommonJS**

- [x] **Diferenciar entre expresiones (expressions) y sentencias (statements)**

- [x] **Callbacks**

- [x] **Promesas**

- [x] **Pruebas unitarias (unit tests)**

- [] **Pruebas asíncronas**

- [x] **Uso de mocks y espías**

- [x] **Pruebas de compatibilidad en múltiples entornos de ejecución**

- [x] **Uso de linter (ESLINT)**

- [x] **Uso de identificadores descriptivos (Nomenclatura y Semántica)**

### Node.js

- [x] **Instalar y usar módulos con npm**

- [x] **Configuración de package.json**

- [x] **Configuración de npm-scripts**

- [x] **process (env, argv, stdin-stdout-stderr, exit-code)**

- [x] **File system (fs, path)**

### Control de Versiones (Git y GitHub)

- [x] **Git: Instalación y configuración**

- [x] **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**

- [x] **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**

- [x] **GitHub: Creación de cuenta y repos, configuración de llaves SSH**

- [x] **GitHub: Despliegue con GitHub Pages**

- [x] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**

- [x] **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**

### HTTP

- [x] **Consulta o petición (request) y respuesta (response).**

- [x] **Codigos de status de HTTP**

***

#### ✨🌸Create by Karen Baron🌸✨
```
        ⠀⠀⠀⠀⠀⠀⠀⢀⣤⠖⠛⠉⠉⠛⠶⣄⡤⠞⠻⠫⠙⠳⢤⡀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⢠⠟⠁⠀⠀⠀⠀⠀⠀⠈⠀⢰⡆⠀⠀⠐⡄⠻⡄⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⡾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⠦⠤⣤⣇⢀⢷⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⢳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡀⢈⡼⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠘⣆⢰⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⣼⠃⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠙⣎⢳⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡾⠃⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠈⢳⣝⠳⣄⡀⠀⠀⠀⠀⠀⢀⡴⠟⠁⠀⠀⠀⠀⠀
        ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⢮⣉⣒⣖⣠⠴⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀
        ⠀⠀⠀⣀⣴⠶⠶⢦⣀⠀⠀⠀⠀⠀⠉⠁⠀⠀⠀⠀⢀⣠⣤⣤⣀⠀⠀⠀
        ⠀⢀⡾⠋⠀⠀⠀⠀⠉⠧⠶⠒⠛⠛⠛⠛⠓⠲⢤⣴⡟⠅⠀⠀⠈⠙⣦⠀
        ⠀⣾⠁⠀⠀⠀⠀⠀⠀⠀⣠⡄⠀⠀⠀⣀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠸⣇
        ⠀⣿⡀⠀⠀⠀⠀⠀⢀⡟⢁⣿⠀⢠⠎⢙⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣽
        ⠀⠈⢻⡇⠀⠀⠀⠀⣾⣧⣾⡃⠀⣾⣦⣾⠇⠀⠀⠀⠀⠀⠀⠀⠰⠀⣼⠇
        ⠀⢰⡟⠀⡤⠴⠦⣬⣿⣿⡏⠀⢰⣿⣿⡿⢀⡄⠤⣀⡀⠀⠀⠀⠰⢿⡁⠀
        ⠀⡞⠀⢸⣇⣄⣤⡏⠙⠛⢁⣴⡈⠻⠿⠃⢚⡀⠀⣨⣿⠀⠀⠀⠀⢸⡇⠀
        ⢰⡇⠀⠀⠈⠉⠁⠀⠀⠀⠀⠙⠁⠀⠀⠀⠈⠓⠲⠟⠋⠀⠀⠀⠀⢀⡇⠀
        ⠈⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠇⠀
        ⠀⢹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⡄⠀
        ⠀⠀⠻⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣽⠋⣷⠀
        ⠀⠀⢰⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠃⠀⣿⡇
        ⠀⠀⢸⡯⠈⠛⢶⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⠾⠋⠂⠀⠀⣿⠃
        ⠀⠀⠈⣷⣄⡛⢠⣈⠉⠛⠶⢶⣶⠶⠶⢶⡶⠾⠛⠉⠀⠀⠀⠁⢠⣠⡏⠀
        ⠀⠀⠀⠈⠳⣅⡺⠟⠀⣀⡶⠟⠁⠀⠀⠘⢷⡄⠀⠛⠻⠦⡄⢀⣒⡿⠀⠀
        ⠀⠀⠀⠀⠀⠈⠉⠉⠛⠁⠀⠀⠀⠀⠒⠂⠀⠙⠶⢬⣀⣀⣤⡶⠟⠁⠀⠀
```