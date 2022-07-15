import { addTask } from "./addtask"
import { dom } from "./dom"
import UI from "./UI"

export function createDOMTask(array) {
    let i = array.length - 1
    const main = document.getElementById('main')
    const div = document.createElement('div')
    const btn = document.createElement('button')
    const p = document.createElement('p')
    p.innerHTML = array[i].title

    div.appendChild(p)

    main.appendChild(div)

}

// creates a new task and pushes it into associated array and associated localstorage.//

export function pushTaskToLocalStorage (key, array, title, date) {
    console.log(title)
    console.log(array)
    const task = addTask(title, date)
    array.push(task)
    localStorage.setItem(key, JSON.stringify(array))

    const tasksArr = JSON.parse(localStorage.getItem(key))

    const ui = new UI();

        ui.createSingleDOMTask(array, key, task.title, task.date)
}


// gets all tasks from key and puts them into array, then uses a for each loop to create a new DOM element for each one by
// creating a new UI and utilising it's inner function createDOMTask.//

export function getTaskFromLocalStorage (key, array) {
    clearAllDomTasks()

    const i = array.length - 1
    let tasksArr;
    if (localStorage.getItem(key) === null) {
        tasksArr = []
    }
    else  {
        tasksArr = JSON.parse(localStorage.getItem(key))
    }
    const ui = new UI();

        tasksArr.forEach(task => { 
            ui.createMultipleDOMTask(array, tasksArr.indexOf(task), task.title, task.date)
        })
    
}

export function clearAllDomTasks() {
    const main = document.getElementById('main')
    main.innerHTML = ``;
}