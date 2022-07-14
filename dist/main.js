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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\nclass UI {\n    \n    createSingleDOMTask(array, key, title, date) {\n\n        let i = array.length - 1\n        const main = document.getElementById('main')\n        const div = document.createElement('div')\n        const btn = document.createElement('button')\n        const p = document.createElement('p')\n        p.innerHTML = title + '   - ' + date\n        div.setAttribute('id', (i))\n        div.classList.add(\"task-div\")\n    \n    \n        div.appendChild(p)\n    \n        main.appendChild(div)\n\n        // div.addEventListener('click', (e) => {\n        // })\n\n    }\n\n    createMultipleDOMTask(array, index, title, date) {\n        const main = document.getElementById('main')\n        const div = document.createElement('div')\n        const btn = document.createElement('button')\n        const p = document.createElement('p')\n        p.innerHTML = title + '   - ' + date\n        div.setAttribute('id', (index))\n        div.classList.add(\"task-div\")\n    \n    \n        div.appendChild(p)\n    \n        main.appendChild(div)\n\n        // div.addEventListener('click', (e) => {\n        // })\n\n    }\n\n    clearDOMTask(event, key, array) {\n        // array.forEach(object => {\n        //     if (object === event)\n        // });\n    }\n}\n\n//# sourceURL=webpack://todo-list2.0/./src/UI.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"dom\": () => (/* binding */ dom),\n/* harmony export */   \"hamburgerBtn\": () => (/* binding */ hamburgerBtn),\n/* harmony export */   \"inboxArr\": () => (/* binding */ inboxArr),\n/* harmony export */   \"navBtnSelection\": () => (/* binding */ navBtnSelection),\n/* harmony export */   \"thisWeekArr\": () => (/* binding */ thisWeekArr),\n/* harmony export */   \"todayArr\": () => (/* binding */ todayArr)\n/* harmony export */ });\n/* harmony import */ var _domCreation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domCreation */ \"./src/domCreation.js\");\n\n\nlet dom = {\n    main : document.getElementById('main'),\n    nav : document.getElementById('nav'),\n    inboxBtn : document.getElementById('inbox'),\n    todayBtn : document.getElementById('today'),\n    thisWeekBtn : document.getElementById('thisWeek'),\n    addTaskBtn : document.getElementById('addTaskBtn'),\n    clearDomBtn : document.getElementById('clearDomBtn'),\n    titleInput : document.getElementById('titleInput'),\n    dateInput : document.getElementById('dateInput')\n}\n\nlet inboxArr = []\nlet todayArr = []\nlet thisWeekArr = []\n\nlet hamburgerBtnActive = true\n\nconst hamburgerBtn = document.querySelector(\".hamburger-btn\").addEventListener('click', () =>{\n    hamburgerBtnActive = !hamburgerBtnActive\n    if (hamburgerBtnActive === true){\n        dom.nav.classList.remove('inactive-nav')\n\n    }\n    else if (hamburgerBtnActive === false){\n        dom.nav.classList.add('inactive-nav')\n    }\n    \n})\n\n\n// assigns id to each of the 3 default inbox types, and adds button highlight on click and removes others highlights.\n// note at some point this function will need to bring up the DOM for each associated array\nfunction navBtnSelection(){\n\n    const navBtnArr = [dom.inboxBtn, dom.todayBtn, dom.thisWeekBtn]\n\n    for (let i = 0; i < navBtnArr.length; i++) {\n        navBtnArr[i].setAttribute('id', 'navBtn'+i)\n    }\n\n    navBtnArr.forEach(btn => {\n        btn.addEventListener('click', (e) => {\n            dom.inboxBtn.classList.remove(\"nav-btn-active\")\n            dom.todayBtn.classList.remove(\"nav-btn-active\")\n            dom.thisWeekBtn.classList.remove(\"nav-btn-active\")\n            e.target.classList.add(\"nav-btn-active\")\n        })\n});\n}\n\ndom.addTaskBtn.addEventListener('click', () => {\n    return (0,_domCreation__WEBPACK_IMPORTED_MODULE_0__.pushTaskToLocalStorage)(\"inboxTasks\", inboxArr, dom.titleInput.value, dom.dateInput.value)\n});\n\ndom.clearDomBtn.addEventListener('click', () => {\n    return (0,_domCreation__WEBPACK_IMPORTED_MODULE_0__.clearAllDomTasks)()\n})\n\ndom.inboxBtn.addEventListener('click', () => {\n    return (0,_domCreation__WEBPACK_IMPORTED_MODULE_0__.getTaskFromLocalStorage)(\"inboxTasks\", inboxArr)\n});\n\ndom.todayBtn.addEventListener('click', () => {\n    return (0,_domCreation__WEBPACK_IMPORTED_MODULE_0__.getTaskFromLocalStorage)(\"todayTasks\", todayArr)\n});\n\ndom.thisWeekBtn.addEventListener('click', () => {\n    return (0,_domCreation__WEBPACK_IMPORTED_MODULE_0__.getTaskFromLocalStorage)(\"weekTasks\", thisWeekArr)\n});\n\ndocument.addEventListener('click', (e) => {\n    if (e.target.id === 'inboxTasks') {\n        console.log(e.target)\n    }\n    return\n})\n\n\n//# sourceURL=webpack://todo-list2.0/./src/dom.js?");

/***/ }),

/***/ "./src/domCreation.js":
/*!****************************!*\
  !*** ./src/domCreation.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clearAllDomTasks\": () => (/* binding */ clearAllDomTasks),\n/* harmony export */   \"createDOMTask\": () => (/* binding */ createDOMTask),\n/* harmony export */   \"getTaskFromLocalStorage\": () => (/* binding */ getTaskFromLocalStorage),\n/* harmony export */   \"pushTaskToLocalStorage\": () => (/* binding */ pushTaskToLocalStorage)\n/* harmony export */ });\n/* harmony import */ var _addtask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addtask */ \"./src/addtask.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UI */ \"./src/UI.js\");\n\n\n\n\nfunction createDOMTask(array) {\n    let i = array.length - 1\n    const main = document.getElementById('main')\n    const div = document.createElement('div')\n    const btn = document.createElement('button')\n    const p = document.createElement('p')\n    p.innerHTML = array[i].title\n\n    div.appendChild(p)\n\n    main.appendChild(div)\n\n}\n\n// creates a new task and pushes it into associated array and associated localstorage.//\n\nfunction pushTaskToLocalStorage (key, array, title, date) {\n    console.log(title)\n    console.log(array)\n    const task = (0,_addtask__WEBPACK_IMPORTED_MODULE_0__.addTask)(title, date)\n    array.push(task)\n    localStorage.setItem(key, JSON.stringify(array))\n\n    const tasksArr = JSON.parse(localStorage.getItem(key))\n\n    const ui = new _UI__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n\n        ui.createMultipleDOMTask(array, tasksArr.indexOf(task), task.title, task.date)\n}\n\n\n// gets all tasks from key and puts them into array, then uses a for each loop to create a new DOM element for each one by\n// creating a new UI and utilising it's inner function createDOMTask.//\n\nfunction getTaskFromLocalStorage (key, array) {\n    clearAllDomTasks()\n\n    const i = array.length - 1\n    let tasksArr;\n    if (localStorage.getItem(key) === null) {\n        tasksArr = []\n    }\n    else  {\n        tasksArr = JSON.parse(localStorage.getItem(key))\n    }\n    const ui = new _UI__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n\n        tasksArr.forEach(task => { \n            ui.createMultipleDOMTask(array, tasksArr.indexOf(task), task.title, task.date)\n        })\n    \n}\n\nfunction clearAllDomTasks() {\n    const main = document.getElementById('main')\n    main.innerHTML = ``;\n}\n\n//# sourceURL=webpack://todo-list2.0/./src/domCreation.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _domCreation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domCreation */ \"./src/domCreation.js\");\n\n\n\n\n(0,_dom__WEBPACK_IMPORTED_MODULE_0__.navBtnSelection)()\n\n\n\n\n\n//# sourceURL=webpack://todo-list2.0/./src/index.js?");

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