import { hamburgerBtn, navBtnSelection, dom } from "./dom"
import { inboxArr } from "./dom"
import { pushTaskToLocalStorage } from "./domCreation"
import { getTaskFromLocalStorage } from "./domCreation"

navBtnSelection()
getTaskFromLocalStorage("inboxTasks", inboxArr)

document.addEventListener("click", e => {
    if (e.target.id === "inboxTasks") {
        console.log(e.target)
    }
    return
})
