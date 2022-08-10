import { navBtnSelection } from "./dom"
import { inboxArr } from "./dom"
import { getTaskFromLocalStorage } from "./inboxTodayWeekCompleted tabs"

if (JSON.parse(localStorage.getItem("inboxTasks")) === null) {
    localStorage.setItem("inboxTasks", JSON.stringify([]))
}
if (JSON.parse(localStorage.getItem("todayTasks")) === null) {
    localStorage.setItem("todayTasks", JSON.stringify([]))
}
if (JSON.parse(localStorage.getItem("thisWeekTasks")) === null) {
    localStorage.setItem("thisWeekTasks", JSON.stringify([]))
}
if (JSON.parse(localStorage.getItem("completed")) === null) {
    localStorage.setItem("completed", JSON.stringify([]))
}
navBtnSelection()
getTaskFromLocalStorage("inboxTasks", inboxArr)
