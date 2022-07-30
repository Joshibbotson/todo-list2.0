import { hamburgerBtn, navBtnSelection, dom } from "./dom"
import { inboxArr } from "./dom"
import {
    pushTaskToLocalStorage,
    getTaskFromLocalStorage,
    createProjectDiv,
} from "./domCreation"
import UI from "./UI"
navBtnSelection()
getTaskFromLocalStorage("inboxTasks", inboxArr)
// createProjectDiv() work in project

if (JSON.parse(localStorage.getItem("inboxTasks")) === null) {
    localStorage.setItem("inboxTasks", JSON.stringify([]))
}
if (JSON.parse(localStorage.getItem("todayTasks")) === null) {
    localStorage.setItem("todayTasks", JSON.stringify([]))
}
if (JSON.parse(localStorage.getItem("thisWeekTasks")) === null) {
    localStorage.setItem("thisWeekTasks", JSON.stringify([]))
}
