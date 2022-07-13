import { addTask } from "./addtask"
import { dom } from "./dom"
import UI from "./UI"

// creates a new task and pushes it into associated array and associated localstorage.//
export function pushTaskToLocalStorage (key, array, title, date) {
    const task = addTask(title, date)
    array.push(task)
    localStorage.setItem(key, JSON.stringify(array))
}

// gets all tasks from key and puts them into array, then uses a for each loop to create a new DOM element for each one by
// creating a new UI and utilising it's inner function createDOMTask.//
export function getTaskFromLocalStorage (key, array) {
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
            ui.createDOMTask(key, task.title, task.date)
        })
    
}

