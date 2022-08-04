import { addTask } from "./addtask"
import {
    dom,
    clickEventDeleteBtns,
    inboxArr,
    todayArr,
    thisWeekArr,
    projectArr,
} from "./dom"
import UI from "./UI"
import {
    filterArrayOnDelete,
    filterArrayOnEdit,
    filterArrayOnTaskCreate,
} from "./filter"
import { format, isToday, parseISO } from "date-fns"
import { addProject } from "./addproject"

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

    const ui = new UI()

    switch (key) {
        case "inboxTasks":
            ui.createSingleDOMTask(array, key, task.title, task.date)
            break
        case "todayTasks":
            break
        case "thisWeekTasks":
            break
        default:
            ui.createSingleDOMTask(array, key, task.title, task.date)
    }
}

// gets all tasks from key and puts them into array, then uses a for each loop to create a new DOM element for each one by
// creating a new UI and utilising it's inner function createMultipleDOMTask.//

export function getTaskFromLocalStorage(key, array) {
    clearAllDomTasks(array)

    const i = array.length - 1
    let tasksArr
    if (localStorage.getItem(key) === null) {
        tasksArr = []
    } else {
        tasksArr = JSON.parse(localStorage.getItem(key))
    }
    const ui = new UI()
    // ui.darkModeToggle()
    tasksArr.forEach(task => {
        ui.createMultipleDOMTask(
            key,
            array,
            tasksArr.indexOf(task),
            task.title,
            task.date
        )
    })
    switch (array) {
        case inboxArr:
            createTaskDiv(array, key)
            break
        case todayArr:
            break
        case thisWeekArr:
            break
        default:
            createTaskDiv(array, key)
            break
    }
}
// edits task on task title click
export function editTaskInLocalStorage(index, target, key, array, title, date) {
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
                    filterArrayOnEdit(
                        tasksArr,
                        index,
                        title,
                        date,
                        textInputValue.value,
                        dateInputValue.value
                    ),
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
        textInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                return (
                    filterArrayOnEdit(
                        tasksArr,
                        index,
                        title,
                        date,
                        textInputValue.value,
                        dateInputValue.value
                    ),
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
        inputDate.addEventListener("blur", () => {
            filterArrayOnEdit(
                tasksArr,
                index,
                title,
                date,
                textInputValue.value,
                dateInputValue.value
            ),
                getTaskFromLocalStorage(key, array)
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
    const title = tasksArr[index].title
    const date = tasksArr[index].date

    filterArrayOnDelete(tasksArr, index, title, date)

    tasksArr.splice(index, 1)
    localStorage.setItem(key, JSON.stringify(tasksArr))
    getTaskFromLocalStorage(key, array)
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

// creates " + Add task" with text input and date input
export function createTaskDiv(array, key) {
    const tasksArr = JSON.parse(localStorage.getItem(key))
    let index
    if (tasksArr === null) {
        index = ""
    } else {
        const tasksArr = JSON.parse(localStorage.getItem(key))
        index = tasksArr.length

        const openAddTaskBtn = document.createElement("button")
        openAddTaskBtn.classList.add("open-add-task-button")
        openAddTaskBtn.innerHTML = "+ Add Task"

        main.appendChild(openAddTaskBtn)

        openAddTaskBtn.addEventListener("click", e => {
            openAddTaskBtn.style.display = "none"
            const mainContainer = document.createElement("div")
            mainContainer.classList.add("add-task-container")

            const inputContainer = document.createElement("div")
            const inputText = document.createElement("input")
            const inputDate = document.createElement("input")

            inputText.setAttribute("type", "text")
            inputText.setAttribute("id", "titleInput")
            inputText.classList.add("input-text")

            inputDate.setAttribute("type", "date")
            inputDate.setAttribute("id", "dateInput")
            inputDate.classList.add("input-date")

            inputContainer.appendChild(inputText)
            inputContainer.appendChild(inputDate)
            inputContainer.classList.add("input-container")

            const btnContainer = document.createElement("div")
            const addBtn = document.createElement("button")
            const cancelBtn = document.createElement("button")

            addBtn.classList.add("add-btn-main")
            addBtn.setAttribute("id", "addTask" + index)
            addBtn.innerHTML = "+ Add Task"

            cancelBtn.classList.add("cancel-btn-main")
            cancelBtn.innerHTML = "cancel"

            btnContainer.appendChild(addBtn)
            btnContainer.appendChild(cancelBtn)
            btnContainer.classList.add("btn-container")

            mainContainer.appendChild(inputContainer)
            mainContainer.appendChild(btnContainer)
            mainContainer.setAttribute("id", "addTask")

            main.appendChild(mainContainer)
            document.getElementById("titleInput").focus()

            const titleInputValue = document.getElementById("titleInput")
            const dateInputValue = document.getElementById("dateInput")

            cancelBtn.addEventListener("click", e => {
                openAddTaskBtn.style.display = "flex"
                mainContainer.remove(document.getElementById(e.target.id))
            })
            document
                .getElementById("addTask" + index)
                .addEventListener("click", e => {
                    console.log(e.target.id)
                    if (titleEmpty(titleInputValue, dateInputValue) === false) {
                        mainContainer.remove(
                            document.getElementById(e.target.id)
                        ),
                            filterArrayOnTaskCreate(
                                titleInputValue.value,
                                dateInputValue.value
                            )
                    }
                    if (titleEmpty(titleInputValue, dateInputValue) === true) {
                        alert("Needs a title!") // must switch that out with a function Modal.
                    }
                })
            inputText.addEventListener("keydown", e => {
                if (e.key === "Enter") {
                    if (titleEmpty(titleInputValue, dateInputValue) === false) {
                        mainContainer.remove(
                            document.getElementById(e.target.id)
                        ),
                            filterArrayOnTaskCreate(
                                titleInputValue.value,
                                dateInputValue.value
                            )
                    }
                    if (titleEmpty(titleInputValue, dateInputValue) === true) {
                        alert("Needs a title!") // must switch that out with a function Modal.
                    }
                    titleInputValue.focus()
                }
                return
            })
            inputDate.addEventListener("blur", e => {
                if (titleEmpty(titleInputValue, dateInputValue) === false) {
                    mainContainer.remove(document.getElementById(e.target.id)),
                        filterArrayOnTaskCreate(
                            titleInputValue.value,
                            dateInputValue.value
                        )
                }
                if (titleEmpty(titleInputValue, dateInputValue) === true) {
                    alert("Needs a title!") // must switch that out with a function Modal.
                }
            })
        })
    }
}

function titleEmpty(title, date) {
    if (
        (date.value === "" && title.value !== "") ||
        (date.value !== "" && title.value !== "")
    ) {
        return false
    } else {
        return true
    }
}

export function createProjectDiv() {
    const nav = document.querySelector(".projects")
    const openAddProjectBtn = document.createElement("button")
    openAddProjectBtn.classList.add("open-add-projects-button")
    openAddProjectBtn.innerHTML = "+ Add Project"

    nav.appendChild(openAddProjectBtn)

    openAddProjectBtn.addEventListener("click", e => {
        openAddProjectBtn.style.display = "none"
        const div = document.createElement("div")
        const addProjectBtn = document.createElement("button")
        const inputText = document.createElement("input")

        addProjectBtn.classList.add("nav-btn-main")
        // btn.setAttribute("id", "addProject" + index)
        addProjectBtn.innerHTML = "+ Add Project"

        inputText.setAttribute("type", "text")
        inputText.setAttribute("id", "titleInput")
        inputText.classList.add("input-text")

        div.classList.add("add-task-container")

        div.appendChild(addProjectBtn)
        div.appendChild(inputText)
        div.setAttribute("id", "addProject")
        nav.appendChild(div)

        addProjectBtn.addEventListener("click", e => [
            div.remove(document.getElementById(e.target.id)),
            pushProject("projects", projectArr, inputText.value),
            (openAddProjectBtn.style.display = "flex"),
        ])
    })
}

function pushProject(key, array, projectName) {
    if (JSON.parse(localStorage.getItem(key) === null)) {
        localStorage.setItem(key, JSON.stringify(array))
    } else {
        array.length === 0
            ? (array = JSON.parse(localStorage.getItem(key)))
            : localStorage.setItem(key, JSON.stringify(array))
    }

    const project = addProject(projectName)
    array.push(project)
    localStorage.setItem(key, JSON.stringify(array))

    const ui = new UI()

    ui.createSingleDOMProject(key, array, projectName)
}

export function getProjectBtns(key, array) {
    const i = array.length - 1
    let projectsArray
    if (localStorage.getItem(key) === null) {
        projectsArray = []
    } else {
        projectsArray = JSON.parse(localStorage.getItem(key))
    }
    const ui = new UI()
    projectsArray.forEach(project => {
        ui.createMultipleDOMProjectBtns(
            projectsArray.indexOf(project),
            project.name
        )
    })
}

export function getProjectFromLocalStorage(key, index) {
    clearAllDomTasks()

    let projectsArr
    if (localStorage.getItem(key) === null) {
        projectsArr = []
        console.log("empty")
    } else {
        projectsArr = JSON.parse(localStorage.getItem(key))
        console.log(projectsArr)
    }

    let project = projectsArr[index].array
    console.log(project)

    const ui = new UI()
    project.forEach(task => {
        ui.createMultipleDOMTask(
            key,
            project,
            projectsArr.indexOf(task),
            task.title,
            task.date
        )
    })
    createTaskDivForProjects("projects", index) //  need to refactor this function for projects specifically
}

function createTaskDivForProjects(key, index) {
    // need to make similar create task div here, this is because altering the other
    // would cause a function that would be overly large and confusing.
    // sadly I should have implemented the logic different from the beginning
    // by putting all inbox, today, this week and following projects into a master array.

    const accessProjectsLS = JSON.parse(localStorage.getItem(key))
    const tasksArr = accessProjectsLS[index].array
    console.log(tasksArr)
    let arrIndex
    if (tasksArr === null) {
        arrIndex = ""
    } else {
        arrIndex = tasksArr.length

        const openAddTaskBtn = document.createElement("button")
        openAddTaskBtn.classList.add("open-add-task-button")
        openAddTaskBtn.innerHTML = "+ Add Task"

        main.appendChild(openAddTaskBtn)

        openAddTaskBtn.addEventListener("click", e => {
            openAddTaskBtn.style.display = "none"
            const mainContainer = document.createElement("div")
            mainContainer.classList.add("add-task-container")

            const inputContainer = document.createElement("div")
            const inputText = document.createElement("input")
            const inputDate = document.createElement("input")

            inputText.setAttribute("type", "text")
            inputText.setAttribute("id", "titleInput")
            inputText.classList.add("input-text")

            inputDate.setAttribute("type", "date")
            inputDate.setAttribute("id", "dateInput")
            inputDate.classList.add("input-date")

            inputContainer.appendChild(inputText)
            inputContainer.appendChild(inputDate)
            inputContainer.classList.add("input-container")

            const btnContainer = document.createElement("div")
            const addBtn = document.createElement("button")
            const cancelBtn = document.createElement("button")

            addBtn.classList.add("add-btn-main")
            addBtn.setAttribute("id", "addTask" + arrIndex)
            addBtn.innerHTML = "+ Add Task"

            cancelBtn.classList.add("cancel-btn-main")
            cancelBtn.innerHTML = "cancel"

            btnContainer.appendChild(addBtn)
            btnContainer.appendChild(cancelBtn)
            btnContainer.classList.add("btn-container")

            mainContainer.appendChild(inputContainer)
            mainContainer.appendChild(btnContainer)
            mainContainer.setAttribute("id", "addTask")

            main.appendChild(mainContainer)
            document.getElementById("titleInput").focus()

            const titleInputValue = document.getElementById("titleInput")
            const dateInputValue = document.getElementById("dateInput")

            cancelBtn.addEventListener("click", e => {
                openAddTaskBtn.style.display = "flex"
                mainContainer.remove(document.getElementById(e.target.id))
            })
            document
                .getElementById("addTask" + arrIndex)
                .addEventListener("click", e => {
                    console.log(e.target.id)
                    if (titleEmpty(titleInputValue, dateInputValue) === false) {
                        mainContainer.remove(
                            document.getElementById(e.target.id)
                        )
                    }
                    if (titleEmpty(titleInputValue, dateInputValue) === true) {
                        alert("Needs a title!") // must switch that out with a function Modal.
                    }
                })
            inputText.addEventListener("keydown", e => {
                if (e.key === "Enter") {
                    if (titleEmpty(titleInputValue, dateInputValue) === false) {
                        mainContainer.remove(
                            document.getElementById(e.target.id)
                        ),
                            pushTaskToLocalStorage(
                                key,
                                tasksArr,
                                titleInputValue.value,
                                dateInputValue
                            )
                    }
                    if (titleEmpty(titleInputValue, dateInputValue) === true) {
                        alert("Needs a title!") // must switch that out with a function Modal.
                    }
                    titleInputValue.focus()
                }
                return
            })
            inputDate.addEventListener("blur", e => {
                if (titleEmpty(titleInputValue, dateInputValue) === false) {
                    mainContainer.remove(document.getElementById(e.target.id)),
                        pushTaskToLocalStorage(
                            key,
                            tasksArr,
                            titleInputValue.value,
                            dateInputValue
                        )
                }
                if (titleEmpty(titleInputValue, dateInputValue) === true) {
                    alert("Needs a title!") // must switch that out with a function Modal.
                }
            })
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
