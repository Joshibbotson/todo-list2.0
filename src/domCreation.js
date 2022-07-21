import { addTask } from "./addtask"
import {
    dom,
    clickEventDeleteBtns,
    inboxArr,
    todayArr,
    thisWeekArr,
} from "./dom"
import UI from "./UI"
import { filterArrayByDate } from "./filter"

// creates a new task and pushes it into associated array and associated localstorage.//
// if the array is empty, which happens everytime a user refreshes/leaves page, the localstorage
// key is set as the array, otherwise localstorage will be reseting due to the empty array.//
// this if/else statement check if localstorage is empty, if it's empty it will set
// localstorage to whatever the array is, if it's not empty it will execute the tertiary statement.
// which checks to see if the array is empty, because resetting local storage if it has objects inside
// would reset the DOM takss.
export function pushTaskToLocalStorage(key, array, title, date) {
    if (JSON.parse(localStorage.getItem(key) === null)) {
        localStorage.setItem(key, JSON.stringify(array))
    } else {
        array.length === 0
            ? (array = JSON.parse(localStorage.getItem(key)))
            : localStorage.setItem(key, JSON.stringify(array))
    }
    const task = addTask(title, date)
    array.push(task)
    localStorage.setItem(key, JSON.stringify(array))

    const tasksArr = JSON.parse(localStorage.getItem(key))
    const ui = new UI()
    ui.createSingleDOMTask(array, key, task.title, task.date)
}

// gets all tasks from key and puts them into array, then uses a for each loop to create a new DOM element for each one by
// creating a new UI and utilising it's inner function createMultipleDOMTask.//

export function getTaskFromLocalStorage(key, array) {
    clearAllDomTasks(array)
    switch (array) {
        case inboxArr:
            createInitialTaskDiv()
            break
        case todayArr:
            break
        case thisWeekArr:
            break
        default:
            createInitialTaskDiv()
            break
    }

    const i = array.length - 1
    let tasksArr
    if (localStorage.getItem(key) === null) {
        tasksArr = []
    } else {
        tasksArr = JSON.parse(localStorage.getItem(key))
    }
    const ui = new UI()

    tasksArr.forEach(task => {
        ui.createMultipleDOMTask(
            key,
            array,
            tasksArr.indexOf(task),
            task.title,
            task.date
        )
    })
}
// edits task on task title click
export function editTaskInLocalStorage(index, target, key, array, title, date) {
    filterArrayByDate(date)
    // console.log(date)
    if (document.getElementById("editTextInput") !== null) {
        return
    } else {
        const tasksArr = JSON.parse(localStorage.getItem(key))

        switch (title) {
            case undefined:
                title = tasksArr[index].title
                break
            default:
                break
        }

        switch (date) {
            case undefined:
                date = tasksArr[index].date
                break
            default:
                break
        }
        const textInput = document.createElement("input")
        const inputDate = document.createElement("input")
        const deleteBtn = document.createElement("button")
        const newContainer = document.createElement("div")
        const existingContainer = document.getElementById(
            "dateAndDeleteContainer" + index
        )
        const existingInputDate = document.getElementById("titleDate")

        newContainer.classList.add("date-and-delete-container")

        deleteBtn.innerHTML = "X"
        deleteBtn.setAttribute("id", index)
        deleteBtn.classList.add("task-delete-btn")

        textInput.setAttribute("type", "text")
        textInput.setAttribute("id", "editTextInput")
        textInput.setAttribute("value", title)

        inputDate.setAttribute("type", "date")
        inputDate.setAttribute("id", "editDateInput")
        inputDate.setAttribute("value", date)

        const div = document.getElementById(index)

        div.removeChild(target)
        div.removeChild(existingContainer)

        div.appendChild(textInput)
        div.appendChild(newContainer)
        newContainer.appendChild(inputDate)
        newContainer.appendChild(deleteBtn)

        const textInputValue = document.getElementById("editTextInput")
        const dateInputValue = document.getElementById("editDateInput")
        div.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                return (
                    (tasksArr[index].title = textInputValue.value),
                    (tasksArr[index].date = dateInputValue.value),
                    localStorage.setItem(key, JSON.stringify(tasksArr)),
                    getTaskFromLocalStorage(key, array)
                )
            } else if (e.key === "Escape") {
                return (
                    (tasksArr[index].title = title),
                    (tasksArr[index].date = date),
                    localStorage.setItem(key, JSON.stringify(tasksArr)),
                    getTaskFromLocalStorage(key, array)
                )
            }
        })
    }
}
//Should in theory splice a given index out of a given array
// then reset the localStorage to that new array and remake the UI using the
// UI class createMultipleDOMTask
export function deleteTask(index, key, array) {
    let tasksArr
    if (localStorage.getItem(key) === null) {
        tasksArr = []
    } else {
        tasksArr = JSON.parse(localStorage.getItem(key))
    }

    tasksArr.splice(index, 1)
    localStorage.setItem(key, JSON.stringify(tasksArr))
    getTaskFromLocalStorage(key, array)
    switch (array) {
        case inboxArr:
            createTaskDiv(array, key)
            break
        case todayArr:
            break
        case thisWeekArr:
            break
    }
}

export function clearAllDomTasks(array) {
    const main = document.getElementById("main")
    main.innerHTML = ``

    const h1 = document.createElement("h1")
    h1.classList.add("main-h1")

    switch (array) {
        case inboxArr:
            h1.innerHTML = "Inbox"
            main.appendChild(h1)
            break
        case todayArr:
            h1.innerHTML = "Today"
            main.appendChild(h1)
            break
        case thisWeekArr:
            h1.innerHTML = "This Week"
            main.appendChild(h1)
            break
        default:
            h1.innerHTML = "Inbox"
            main.appendChild(h1)
    }
}

export function createInitialTaskDiv() {
    const div = document.createElement("div")
    const btn = document.createElement("button")
    const inputText = document.createElement("input")
    const inputDate = document.createElement("input")

    btn.classList.add("nav-btn-main")
    btn.setAttribute("id", "initialAddTaskBtn")
    btn.innerHTML = "+ Add Task"

    inputText.setAttribute("type", "text")
    inputText.setAttribute("id", "initialTitleInput")

    inputDate.setAttribute("type", "date")
    inputDate.setAttribute("id", "initialDateInput")

    div.appendChild(btn)
    div.appendChild(inputText)
    div.appendChild(inputDate)

    main.appendChild(div)

    const titleInputValue = document.getElementById("initialTitleInput")
    const dateInputValue = document.getElementById("initialDateInput")

    document
        .getElementById("initialAddTaskBtn")
        .addEventListener("click", e => {
            console.log("clicked init")
            return (
                div.remove(document.getElementById("initialAddTaskBtn")),
                pushTaskToLocalStorage(
                    "inboxTasks",
                    inboxArr,
                    titleInputValue.value,
                    dateInputValue.value
                )
            )
        })
}

export function createTaskDiv(array, key) {
    console.log("createTaskDiv")
    const initialAddTaskBtn = document.getElementById("initialAddTaskBtn")
    if (initialAddTaskBtn !== null) {
        return
    } else {
        const tasksArr = JSON.parse(localStorage.getItem(key))
        const index = tasksArr.length

        const div = document.createElement("div")
        const btn = document.createElement("button")
        const inputText = document.createElement("input")
        const inputDate = document.createElement("input")

        btn.classList.add("nav-btn-main")
        btn.setAttribute("id", "addTask" + index)
        btn.innerHTML = "+ Add Task"

        inputText.setAttribute("type", "text")
        inputText.setAttribute("id", "titleInput")

        inputDate.setAttribute("type", "date")
        inputDate.setAttribute("id", "dateInput")

        div.appendChild(btn)
        div.appendChild(inputText)
        div.appendChild(inputDate)
        div.setAttribute("id", "addTask")

        main.appendChild(div)

        const titleInputValue = document.getElementById("titleInput")
        const dateInputValue = document.getElementById("dateInput")

        document
            .getElementById("addTask" + index)
            .addEventListener("click", e => {
                console.log(e.target.id)

                return (
                    div.remove(document.getElementById(e.target.id)),
                    pushTaskToLocalStorage(
                        "inboxTasks",
                        inboxArr,
                        titleInputValue.value,
                        dateInputValue.value
                    )
                )
            })
    }
}

export function inputTitleDOM(array) {
    const main = dom.main
    const h1 = document.createElement("h1")
    h1.classList.add("main-h1")
    switch (array) {
        case inboxArr:
            h1.innerHTML = "Inbox"
            main.appendChild(h1)
            break
        case todayArr:
            h1.innerHTML = "Today"
            main.appendChild(h1)
            break
        case thisWeekArr:
            h1.innerHTML = "This Week"
            main.appendChild(h1)
            break
    }
}

/////////////////////////////////////////////////////////////
