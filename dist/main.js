/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _domCreation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domCreation */ \"./src/domCreation.js\");\n\n\nclass UI {\n    \n    createSingleDOMTask(array, key, title, date) {\n        let tasksArr = JSON.parse(localStorage.getItem(key))\n        let i = tasksArr.length - 1\n\n        const main = document.getElementById('main')\n        const div = document.createElement('div')\n        const dateAndDeleteDiv = document.createElement('div')\n        const deleteBtn = document.createElement('button')\n        const dateInput = document.createElement('INPUT')\n        const p = document.createElement('p')\n        p.innerHTML = title + '   - ' + date\n        div.setAttribute('id', i)\n        div.classList.add(\"task-div\")\n\n        deleteBtn.innerHTML = \"X\"\n        deleteBtn.setAttribute('id', i)\n        deleteBtn.classList.add(\"task-delete-btn\")\n        dateInput.setAttribute('type', 'date')\n\n    \n    \n        dateAndDeleteDiv.classList.add('date-and-delete-container')\n        dateAndDeleteDiv.appendChild(dateInput)\n        dateAndDeleteDiv.appendChild(deleteBtn)\n\n        div.appendChild(p)\n        div.appendChild(dateAndDeleteDiv)\n        \n    \n        main.appendChild(div)\n\n        deleteBtn.addEventListener('click', (e) => {\n            let i = e.target.id\n            return (0,_domCreation__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(i, key, array)\n        })\n\n\n    }\n\n    createMultipleDOMTask(key, array, index, title, date) {\n        const main = document.getElementById('main')\n        const div = document.createElement('div')\n        const dateAndDeleteDiv = document.createElement('div')\n        const deleteBtn = document.createElement('button')\n        const dateInput = document.createElement('INPUT')\n        const p = document.createElement('p')\n        p.innerHTML = title + '   - ' + date\n        deleteBtn.innerHTML = \"X\"\n        deleteBtn.setAttribute('id', index)\n        deleteBtn.classList.add(\"task-delete-btn\")\n\n        dateInput.setAttribute('type', 'date')\n\n        div.setAttribute('id', index)\n        div.classList.add(\"task-div\")\n    \n    \n        dateAndDeleteDiv.classList.add('date-and-delete-container')\n        dateAndDeleteDiv.appendChild(dateInput)\n        dateAndDeleteDiv.appendChild(deleteBtn)\n\n        div.appendChild(p)\n        div.appendChild(dateAndDeleteDiv)\n        \n    \n        main.appendChild(div)\n\n\n        deleteBtn.addEventListener('click', (e) => {\n            let i = e.target.id\n            return (0,_domCreation__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(i, key, array)\n        })\n\n    }\n\n    clearDOMTask(event, key, array) {\n        // array.forEach(object => {\n        //     if (object === event)\n        // });\n    }\n}\n\n//# sourceURL=webpack://todo-list2.0/./src/UI.js?");

/***/ }),

/***/ "./src/addtask.js":
/*!************************!*\
  !*** ./src/addtask.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addTask\": () => (/* binding */ addTask)\n/* harmony export */ });\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n// spits outs an object with a title: \"lorem\" and date: \"19/04/1996\"\nfunction addTask(title, date) {\n    const task = {\n        title: title,\n        date: date\n    }\n    return task\n}\n\n//# sourceURL=webpack://todo-list2.0/./src/addtask.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dom\": () => (/* binding */ dom),\n/* harmony export */   \"hamburgerBtn\": () => (/* binding */ hamburgerBtn),\n/* harmony export */   \"inboxArr\": () => (/* binding */ inboxArr),\n/* harmony export */   \"navBtnSelection\": () => (/* binding */ navBtnSelection),\n/* harmony export */   \"thisWeekArr\": () => (/* binding */ thisWeekArr),\n/* harmony export */   \"todayArr\": () => (/* binding */ todayArr)\n/* harmony export */ });\n/* harmony import */ var _domCreation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domCreation */ \"./src/domCreation.js\");\n\n\nlet dom = {\n    main : document.getElementById('main'),\n    nav : document.getElementById('nav'),\n    inboxBtn : document.getElementById('inbox'),\n    todayBtn : document.getElementById('today'),\n    thisWeekBtn : document.getElementById('thisWeek'),\n    addTaskBtn : document.getElementById('addTaskBtn'),\n    titleInput : document.getElementById('titleInput'),\n    dateInput : document.getElementById('dateInput')\n}\n\nlet inboxArr = []\nlet todayArr = []\nlet thisWeekArr = []\n\nlet hamburgerBtnActive = true\n\nconst hamburgerBtn = document.querySelector(\".hamburger-btn\").addEventListener('click', () =>{\n    hamburgerBtnActive = !hamburgerBtnActive\n    if (hamburgerBtnActive === true){\n        dom.nav.classList.remove('inactive-nav')\n\n    }\n    else if (hamburgerBtnActive === false){\n        dom.nav.classList.add('inactive-nav')\n    }\n    \n})\n\n\n// assigns id to each of the 3 default inbox types, and adds button highlight on click and removes others highlights.\n// note at some point this function will need to bring up the DOM for each associated array\n\nfunction navBtnSelection(){\n\n    const navBtnArr = [dom.inboxBtn, dom.todayBtn, dom.thisWeekBtn]\n\n    for (let i = 0; i < navBtnArr.length; i++) {\n        navBtnArr[i].setAttribute('id', 'navBtn'+i)\n    }\n\n    navBtnArr.forEach(btn => {\n        btn.addEventListener('click', (e) => {\n            dom.inboxBtn.classList.remove(\"nav-btn-active\")\n            dom.todayBtn.classList.remove(\"nav-btn-active\")\n            dom.thisWeekBtn.classList.remove(\"nav-btn-active\")\n            e.target.classList.add(\"nav-btn-active\")\n            })\n});\n}\n\ndom.addTaskBtn.addEventListener('click', () => {\n    return (0,_domCreation__WEBPACK_IMPORTED_MODULE_0__.pushTaskToLocalStorage)(\"inboxTasks\", inboxArr, dom.titleInput.value, dom.dateInput.value)\n});\n\ndom.inboxBtn.addEventListener('click', () => {\n\n    return (0,_domCreation__WEBPACK_IMPORTED_MODULE_0__.getTaskFromLocalStorage)(\"inboxTasks\", inboxArr)\n});\n\ndom.todayBtn.addEventListener('click', () => {\n    \n    return (0,_domCreation__WEBPACK_IMPORTED_MODULE_0__.getTaskFromLocalStorage)(\"todayTasks\", todayArr)\n});\n\ndom.thisWeekBtn.addEventListener('click', () => {\n    return (0,_domCreation__WEBPACK_IMPORTED_MODULE_0__.getTaskFromLocalStorage)(\"weekTasks\", thisWeekArr)\n});\n\n\n\n\n//# sourceURL=webpack://todo-list2.0/./src/dom.js?");

/***/ }),

/***/ "./src/domCreation.js":
/*!****************************!*\
  !*** ./src/domCreation.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clearAllDomTasks\": () => (/* binding */ clearAllDomTasks),\n/* harmony export */   \"createDOMTask\": () => (/* binding */ createDOMTask),\n/* harmony export */   \"deleteTask\": () => (/* binding */ deleteTask),\n/* harmony export */   \"getTaskFromLocalStorage\": () => (/* binding */ getTaskFromLocalStorage),\n/* harmony export */   \"inputTitleDOM\": () => (/* binding */ inputTitleDOM),\n/* harmony export */   \"pushTaskToLocalStorage\": () => (/* binding */ pushTaskToLocalStorage)\n/* harmony export */ });\n/* harmony import */ var _addtask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addtask */ \"./src/addtask.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ \"./src/UI.js\");\n\n\n\n\n\nfunction createDOMTask(array) {\n    let i = array.length - 1\n    const main = document.getElementById('main')\n    const div = document.createElement('div')\n    const btn = document.createElement('button')\n    const p = document.createElement('p')\n    p.innerHTML = array[i].title\n\n    div.appendChild(p)\n\n    main.appendChild(div)\n\n}\n\n// creates a new task and pushes it into associated array and associated localstorage.//\n// if the array is empty, which happens everytime a user refreshes/leaves page, the localstorage\n// key is set as the array, otherwise localstorage will be reseting due to the empty array.//\n\nfunction pushTaskToLocalStorage (key, array, title, date) {\n    // this if/else statement check if localstorage is empty, if it's empty it will set\n    // localstorage to whatever the array is, if it's not empty it will execute the tertiary statement.\n    // which checks to see if the array is empty, because resetting local storage if it has objects inside\n    // would reset the DOM takss.\n    \n    if (JSON.parse(localStorage.getItem(key) === null)) {\n        localStorage.setItem(key, JSON.stringify(array))\n    }\n    else {\n        array.length === 0 ? array = JSON.parse(localStorage.getItem(key)) : localStorage.setItem(key, JSON.stringify(array))\n    }\n    const task = (0,_addtask__WEBPACK_IMPORTED_MODULE_0__.addTask)(title, date)\n    array.push(task)\n    localStorage.setItem(key, JSON.stringify(array))\n\n    const tasksArr = JSON.parse(localStorage.getItem(key))\n    const ui = new _UI__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    ui.createSingleDOMTask(array, key, task.title, task.date)\n\n}\n\n\n// gets all tasks from key and puts them into array, then uses a for each loop to create a new DOM element for each one by\n// creating a new UI and utilising it's inner function createDOMTask.//\n\nfunction getTaskFromLocalStorage (key, array) {\n    clearAllDomTasks(array)\n\n    const i = array.length - 1\n    let tasksArr;\n    if (localStorage.getItem(key) === null) {\n        tasksArr = []\n    }\n    else  {\n        tasksArr = JSON.parse(localStorage.getItem(key))\n    }\n    const ui = new _UI__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n\n        tasksArr.forEach(task => { \n            ui.createMultipleDOMTask(key, array, tasksArr.indexOf(task), task.title, task.date)\n        })\n    \n}\n\n//Should in theory splice a given index out of a given array\n// then reset the localStorage to that new array and remake the UI using the\n// UI class createMultipleDOMTask\nfunction deleteTask(index, key, array) {\n    let tasksArr;\n    if (localStorage.getItem(key) === null) {\n        tasksArr = []\n    }\n    else  {\n        tasksArr = JSON.parse(localStorage.getItem(key))\n    }\n\n    tasksArr.splice(index, 1)\n    localStorage.setItem(key, JSON.stringify(tasksArr))\n    getTaskFromLocalStorage(key, array)\n}\n\nfunction clearAllDomTasks(array) {\n    const main = document.getElementById('main')\n    main.innerHTML = ` `;\n    const h1 = document.createElement('h1')\n    h1.classList.add(\"main-h1\")\n        switch (array) {\n            case _dom__WEBPACK_IMPORTED_MODULE_1__.inboxArr:\n                h1.innerHTML = \"Inbox\"\n                main.appendChild(h1)\n                break\n            case _dom__WEBPACK_IMPORTED_MODULE_1__.todayArr:\n                h1.innerHTML = \"Today\"\n                main.appendChild(h1)\n                break\n            case _dom__WEBPACK_IMPORTED_MODULE_1__.thisWeekArr: \n                h1.innerHTML = \"This Week\"\n                main.appendChild(h1)\n                break\n            default: \n                h1.innerHTML = \"Inbox\"\n                main.appendChild(h1)\n        }\n}\n\nfunction inputTitleDOM(array){\n    const main = _dom__WEBPACK_IMPORTED_MODULE_1__.dom.main\n    const h1 = document.createElement('h1')\n    h1.classList.add(\"main-h1\")\n        switch (array) {\n            case _dom__WEBPACK_IMPORTED_MODULE_1__.inboxArr:\n                h1.innerHTML = \"Inbox\"\n                main.appendChild(h1)\n                break\n            case _dom__WEBPACK_IMPORTED_MODULE_1__.todayArr:\n                h1.innerHTML = \"Today\"\n                main.appendChild(h1)\n                break\n            case _dom__WEBPACK_IMPORTED_MODULE_1__.thisWeekArr: \n                h1.innerHTML = \"This Week\"\n                main.appendChild(h1)\n                break\n        }\n}\n\n//# sourceURL=webpack://todo-list2.0/./src/domCreation.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _domCreation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domCreation */ \"./src/domCreation.js\");\n\n\n\n\n\n(0,_dom__WEBPACK_IMPORTED_MODULE_0__.navBtnSelection)()\n;(0,_domCreation__WEBPACK_IMPORTED_MODULE_1__.getTaskFromLocalStorage)(\"inboxTasks\", _dom__WEBPACK_IMPORTED_MODULE_0__.inboxArr)\n\ndocument.addEventListener('click', (e) => {\n    if (e.target.id === 'inboxTasks') {\n        console.log(e.target)\n    }\n    return\n})\n\n\n\n\n//# sourceURL=webpack://todo-list2.0/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;