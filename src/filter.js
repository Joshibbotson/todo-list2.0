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

export function filterArrayOnTaskCreate(title, date) {
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
            pushTaskToLocalStorage("thisWeekTasks", thisWeekArr, title, date)
            pushTaskToLocalStorage("todayTasks", todayArr, title, date)
            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        }
        if (differenceInDays < 7 && differenceInDays >= 1) {
            console.log("this week")

            pushTaskToLocalStorage("thisWeekTasks", thisWeekArr, title, date)
            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        } else if (differenceInDays > 7) {
            console.log("longer than a week")

            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        }
    }
}

// logic should be take params of old tilte/date and new title/date
// search arrays for old title/date, if same object present, update and set localstorage
// with new title/date, else do nothing.
export function filterArrayOnEdit(
    masterKey,
    masterIndex,
    oldTitle,
    oldDate,
    newTitle,
    newDate,
    array
) {
    const inboxTasks = JSON.parse(localStorage.getItem("inboxTasks"))
    const todayTasks = JSON.parse(localStorage.getItem("todayTasks"))
    const thisWeekTasks = JSON.parse(localStorage.getItem("thisWeekTasks"))
    if (
        inboxTasks.some(object => object.title === oldTitle) === true &&
        inboxTasks.some(object => object.date === oldDate) === true
    ) {
        for (let i = 0; i < inboxTasks.length; i++) {
            if (
                inboxTasks[i].title === masterKey[masterIndex].title &&
                inboxTasks[i].date === masterKey[masterIndex].date
            ) {
                inboxTasks[i].title = newTitle
                inboxTasks[i].date = newDate
                localStorage.setItem("inboxTasks", JSON.stringify(inboxTasks))
            }
        }
    }
    if (
        todayTasks.some(title => title.title === oldTitle) === true &&
        todayTasks.some(title => title.date === oldDate) === true
    ) {
        for (let i = 0; i < todayTasks.length; i++) {
            if (
                todayTasks[i].title === masterKey[masterIndex].title &&
                todayTasks[i].date === masterKey[masterIndex].date
            ) {
                todayTasks[i].title = newTitle
                todayTasks[i].date = newDate
                localStorage.setItem("todayTasks", JSON.stringify(todayTasks))
            }
        }
    }

    if (
        thisWeekTasks.some(object => object.title === oldTitle) === true &&
        thisWeekTasks.some(object => object.date === oldDate) === true
    ) {
        for (let i = 0; i < thisWeekTasks.length; i++) {
            if (
                thisWeekTasks[i].title === masterKey[masterIndex].title &&
                thisWeekTasks[i].date === masterKey[masterIndex].date
            ) {
                thisWeekTasks[i].title = newTitle
                thisWeekTasks[i].date = newDate
                localStorage.setItem(
                    "thisWeekTasks",
                    JSON.stringify(thisWeekTasks)
                )
            }
        }
    }
    return
}
