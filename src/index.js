import { hamburgerBtn, navBtnSelection, dom, projectArr } from "./dom"
import { inboxArr } from "./dom"
import {
    pushTaskToLocalStorage,
    getTaskFromLocalStorage,
    createProjectDiv,
    getProjectBtns,
} from "./domCreation"
import UI from "./UI"

if (JSON.parse(localStorage.getItem("inboxTasks")) === null) {
    localStorage.setItem("inboxTasks", JSON.stringify([]))
}
if (JSON.parse(localStorage.getItem("todayTasks")) === null) {
    localStorage.setItem("todayTasks", JSON.stringify([]))
}
if (JSON.parse(localStorage.getItem("thisWeekTasks")) === null) {
    localStorage.setItem("thisWeekTasks", JSON.stringify([]))
}
if (JSON.parse(localStorage.getItem("projects")) === null) {
    localStorage.setItem("projects", JSON.stringify([]))
}
navBtnSelection()
getTaskFromLocalStorage("inboxTasks", inboxArr)
// createProjectDiv()
// getProjectBtns("projects", projectArr)
