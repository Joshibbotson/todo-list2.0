import { addTask } from "./addtask"
import { pushTaskToLocalStorage, getTaskFromLocalStorage } from "./domCreation"
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
    if (date === "") {
        pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
    } else {
        const newDate = new Date(date)
        const today = new Date()
        // const formattedDate = format(newDate, "yyyy/dd/MM")
        // const formattedToday = format(today, "yyyy/dd/MM")

        const differenceInDays = differenceInCalendarDays(today, newDate)
        console.log(differenceInDays)
        if (differenceInDays === 0) {
            console.log("true it is today")

            pushTaskToLocalStorage("thisWeekTasks", thisWeekArr, title, date)
            pushTaskToLocalStorage("todayTasks", todayArr, title, date)
            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        }
        if (differenceInDays <= 7 && differenceInDays >= 1) {
            console.log("this week")

            pushTaskToLocalStorage("thisWeekTasks", thisWeekArr, title, date)
            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        }
        if (differenceInDays < 0) {
            console.log("will happen further than this week in the future")

            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        } else if (differenceInDays > 7) {
            console.log("happened longer than a week ago")

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
    newDate
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
                // filterArrayOnDateChange(
                //     masterKey,
                //     masterIndex,
                //     newTitle,
                //     newDate
                // )
            }
        }
    }
    if (
        todayTasks.some(object => object.title === oldTitle) === true &&
        todayTasks.some(object => object.date === oldDate) === true
    ) {
        for (let i = 0; i < todayTasks.length; i++) {
            if (
                todayTasks[i].title === masterKey[masterIndex].title &&
                todayTasks[i].date === masterKey[masterIndex].date
            ) {
                todayTasks[i].title = newTitle
                todayTasks[i].date = newDate
                localStorage.setItem("todayTasks", JSON.stringify(todayTasks))
                // filterArrayOnDateChange(
                //     masterKey,
                //     masterIndex,
                //     newTitle,
                //     newDate
                // )
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
                // filterArrayOnDateChange(
                //     masterKey,
                //     masterIndex,
                //     newTitle,
                //     newDate
                // )
            }
        }
        filterArrayOnDateChange(masterKey, masterIndex, newTitle, newDate)
    }
    return
}

export function filterArrayOnDelete(
    masterKey,
    masterIndex,
    masterTitle,
    masterDate
) {
    const inboxTasks = JSON.parse(localStorage.getItem("inboxTasks"))
    const todayTasks = JSON.parse(localStorage.getItem("todayTasks"))
    const thisWeekTasks = JSON.parse(localStorage.getItem("thisWeekTasks"))
    if (
        inboxTasks.some(object => object.title === masterTitle) === true &&
        inboxTasks.some(object => object.date === masterDate) === true
    ) {
        for (let i = 0; i < inboxTasks.length; i++) {
            if (
                inboxTasks[i].title === masterKey[masterIndex].title &&
                inboxTasks[i].date === masterKey[masterIndex].date
            ) {
                inboxTasks.splice(i, 1)
                localStorage.setItem("inboxTasks", JSON.stringify(inboxTasks))
            }
        }
    }
    if (
        todayTasks.some(object => object.title === masterTitle) === true &&
        todayTasks.some(object => object.date === masterDate) === true
    ) {
        for (let i = 0; i < todayTasks.length; i++) {
            if (
                todayTasks[i].title === masterKey[masterIndex].title &&
                todayTasks[i].date === masterKey[masterIndex].date
            ) {
                console.log("we made it deep")
                todayTasks.splice(i, 1)
                localStorage.setItem("todayTasks", JSON.stringify(todayTasks))
            }
        }
    }
    if (
        thisWeekTasks.some(object => object.title === masterTitle) === true &&
        thisWeekTasks.some(object => object.date === masterDate) === true
    ) {
        for (let i = 0; i < thisWeekTasks.length; i++) {
            if (
                thisWeekTasks[i].title === masterKey[masterIndex].title &&
                thisWeekTasks[i].date === masterKey[masterIndex].date
            ) {
                thisWeekTasks.splice(i, 1)
                localStorage.setItem(
                    "thisWeekTasks",
                    JSON.stringify(thisWeekTasks)
                )
            }
        }
    }
}

// this will be called on after editing, it should do the following:
//- check the result against all arrays
// - if true: check the date agaisnt the criteria of that array
//  - if true: do nothing.
//  - if false: remove it from the array

// second half
// at this point in incorrect tasks should have been removed
// we now need to add in the task to any array it should be in
// which arguably we could use filterArrayOnTaskCreate in theory...
export function filterArrayOnDateChange(
    masterKey,
    masterIndex,
    masterTitle,
    masterDate
) {
    const inboxTasks = JSON.parse(localStorage.getItem("inboxTasks"))
    const todayTasks = JSON.parse(localStorage.getItem("todayTasks"))
    const thisWeekTasks = JSON.parse(localStorage.getItem("thisWeekTasks"))

    const newDate = new Date(masterDate)
    const today = new Date()
    const differenceInDays = differenceInCalendarDays(today, newDate)
    // ////////
    // DELETE SECTION//
    /////////
    if (
        todayTasks.some(object => object.title === masterTitle) === true &&
        todayTasks.some(object => object.date === masterDate) === true
    ) {
        switch (differenceInDays) {
            case 0:
                break
            default:
                for (let i = 0; i < todayTasks.length; i++) {
                    if (
                        todayTasks[i].title === masterTitle &&
                        todayTasks[i].date === masterDate
                    ) {
                        todayTasks.splice(i, 1)
                        localStorage.setItem(
                            "todayTasks",
                            JSON.stringify(todayTasks)
                        )
                    }
                }
        }
    }
    if (
        thisWeekTasks.some(object => object.title === masterTitle) === true &&
        thisWeekTasks.some(object => object.date === masterDate) === true
    ) {
        switch (differenceInDays) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                break
            default:
                for (let i = 0; i < thisWeekTasks.length; i++) {
                    if (
                        thisWeekTasks[i].title === masterTitle &&
                        thisWeekTasks[i].date === masterDate
                    ) {
                        thisWeekTasks.splice(i, 1)
                        localStorage.setItem(
                            "thisWeekTasks",
                            JSON.stringify(thisWeekTasks)
                        )
                    }
                }
        }
    }

    // DELETE SECTION END//
    // ADD SECTION BEGIN//

    if (differenceInDays === 0) {
        switch (presentInArray(todayTasks, masterTitle, masterDate)) {
            case true:
                break
            case false:
                pushTaskToLocalStorage(
                    "todayTasks",
                    todayArr,
                    masterTitle,
                    masterDate
                )
        }
    }
    if (differenceInDays <= 7 && differenceInDays >= 1) {
        switch (presentInArray(thisWeekTasks, masterTitle, masterDate)) {
            case true:
                break
            case false:
                pushTaskToLocalStorage(
                    "thisWeekTasks",
                    thisWeekArr,
                    masterTitle,
                    masterDate
                )
        }
    }
}

function presentInArray(array, title, date) {
    if (
        array.some(object => object.title === title) &&
        array.some(object => object.date === date)
    ) {
        console.log("true")
        return true
    } else {
        console.log("false")
        return false
    }
}
