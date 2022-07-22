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
import { format, isToday, parseISO, differenceInCalendarDays } from "date-fns"

export function filterArrayByDate(title, date) {
    if (date === null) {
        pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
    } else {
        const newDate = new Date(date)
        const today = new Date()
        const formattedDate = format(newDate, "yyyy/dd/MM")
        const formattedToday = format(today, "yyyy/dd/MM")

        const differenceInDays = differenceInCalendarDays(today, newDate)
        console.log(differenceInDays)
        if (differenceInDays === 0) {
            console.log("true it is today")
            pushTaskToLocalStorage("todayTasks", todayArr, title, date)
            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        }
        if (differenceInDays < 7 && differenceInDays > 1) {
            console.log("this week")

            pushTaskToLocalStorage("thisWeekTasks", thisWeekArr, title, date)
            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        } else if (differenceInDays > 7) {
            console.log("longer than a week")

            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        }
    }
}
