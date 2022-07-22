import { addTask } from "./addtask"
import { pushTaskToLocalStorage } from "./domCreation"
import {
    dom,
    clickEventDeleteBtns,
    inboxArr,
    todayArr,
    thisWeekArr,
} from "./dom"
import UI from "./UI"
import { format, isToday, parseISO } from "date-fns"

export function filterArrayByDate(title, date) {
    console.log(date)
    if (date === null) {
        pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
    } else {
        const newDate = new Date(date)
        const formattedDate = format(newDate, "yyyy/dd/MM")
        console.log(isToday(parseISO(date)))

        if (isToday(parseISO(date)) === true) {
            console.log("true it is today")
            pushTaskToLocalStorage("todayTasks", todayArr, title, date)
            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        } else if (isToday(parseISO(date)) === false) {
            console.log("nope not today")

            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        }
    }
}
