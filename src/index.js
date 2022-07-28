import { hamburgerBtn, navBtnSelection, dom } from "./dom"
import { inboxArr } from "./dom"
import { pushTaskToLocalStorage } from "./domCreation"
import { getTaskFromLocalStorage } from "./domCreation"

navBtnSelection()
getTaskFromLocalStorage("inboxTasks", inboxArr)

if (JSON.parse(localStorage.getItem("inboxTasks")) === null) {
    localStorage.setItem("inboxTasks", JSON.stringify([]))
}
if (JSON.parse(localStorage.getItem("todayTasks")) === null) {
    localStorage.setItem("todayTasks", JSON.stringify([]))
}
if (JSON.parse(localStorage.getItem("thisWeekTasks")) === null) {
    localStorage.setItem("thisWeekTasks", JSON.stringify([]))
}
