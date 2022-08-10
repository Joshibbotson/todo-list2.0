import { pushTaskToLocalStorage } from "./inboxTodayWeekCompleted tabs"
import { inboxArr, todayArr, thisWeekArr } from "./dom"
import { isToday, isThisWeek, parseISO } from "date-fns"

export function filterArrayOnTaskCreate(title, date) {
    if (date === "") {
        pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
    } else {
        const today = isToday(parseISO(date))
        const thisWeek = isThisWeek(parseISO(date))

        if (today === true) {
            pushTaskToLocalStorage("thisWeekTasks", thisWeekArr, title, date)
            pushTaskToLocalStorage("todayTasks", todayArr, title, date)
            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        }
        if (thisWeek === true && today === false) {
            pushTaskToLocalStorage("thisWeekTasks", thisWeekArr, title, date)
            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        }
        if (thisWeek === false && today === false) {
            pushTaskToLocalStorage("inboxTasks", inboxArr, title, date)
        }
    }
}

// logic should be take params of old tilte/date and new title/date
// search arrays for old title/date, if same object present, update and set localstorage
// with new title/date, else do nothing.
export function filterArrayOnEdit(
    masterArr,
    masterIndex,
    oldTitle,
    oldDate,
    newTitle,
    newDate
) {
    //Arrays taken from localstorage
    const inboxTasks = JSON.parse(localStorage.getItem("inboxTasks"))
    const todayTasks = JSON.parse(localStorage.getItem("todayTasks"))
    const thisWeekTasks = JSON.parse(localStorage.getItem("thisWeekTasks"))

    if (
        inboxTasks.some(object => object.title === oldTitle) === true &&
        inboxTasks.some(object => object.date === oldDate) === true
    ) {
        for (let i = 0; i < inboxTasks.length; i++) {
            if (
                inboxTasks[i].title === oldTitle &&
                inboxTasks[i].date === oldDate
            ) {
                inboxTasks[i].title = newTitle
                inboxTasks[i].date = newDate
                localStorage.setItem("inboxTasks", JSON.stringify(inboxTasks))
            }
        }
    }
    if (
        todayTasks.some(object => object.title === oldTitle) === true &&
        todayTasks.some(object => object.date === oldDate) === true
    ) {
        for (let i = 0; i < todayTasks.length; i++) {
            if (
                todayTasks[i].title === oldTitle &&
                todayTasks[i].date === oldDate
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
                thisWeekTasks[i].title === oldTitle &&
                thisWeekTasks[i].date === oldDate
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
    filterArrayOnDateChange(masterArr, masterIndex, newTitle, newDate)
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
                inboxTasks[i].title === masterTitle &&
                inboxTasks[i].date === masterDate
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
                todayTasks[i].title === masterTitle &&
                todayTasks[i].date === masterDate
            ) {
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

export function filterArrayOnDateChange(
    masterArr,
    masterIndex,
    masterTitle,
    masterDate
) {
    const inboxTasks = JSON.parse(localStorage.getItem("inboxTasks"))
    const todayTasks = JSON.parse(localStorage.getItem("todayTasks"))
    const thisWeekTasks = JSON.parse(localStorage.getItem("thisWeekTasks"))

    const today = isToday(parseISO(masterDate))
    const thisWeek = isThisWeek(parseISO(masterDate))

    // ////////
    // DELETE SECTION//
    /////////
    if (
        todayTasks.some(object => object.title === masterTitle) === true &&
        todayTasks.some(object => object.date === masterDate) === true
    ) {
        switch (today) {
            case true:
                break
            case false:
                for (let i = 0; i < todayTasks.length; i++) {
                    if (
                        todayTasks[i].title === masterTitle &&
                        todayTasks[i].date === masterDate
                    ) {
                        const arr = JSON.parse(
                            localStorage.getItem("todayTasks")
                        )
                        arr.splice(i, 1)
                        localStorage.setItem("todayTasks", JSON.stringify(arr))
                    }
                }
        }
    }
    if (
        thisWeekTasks.some(object => object.title === masterTitle) === true &&
        thisWeekTasks.some(object => object.date === masterDate) === true
    ) {
        switch (thisWeek) {
            case true:
                break
            case false:
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
    // // DELETE SECTION END//
    // // ADD SECTION BEGIN//
    if (today === true) {
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
                switch (
                    presentInArray(thisWeekTasks, masterTitle, masterDate)
                ) {
                    case true:
                        break
                    case false:
                        pushTaskToLocalStorage(
                            "thisWeekTasks",
                            todayArr,
                            masterTitle,
                            masterDate
                        )
                }
        }
    }
    if (thisWeek === true && today === false) {
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
    if (thisWeek === false) {
        switch (presentInArray(inboxTasks, masterTitle, masterDate)) {
            case true:
                break
            case false:
                pushTaskToLocalStorage(
                    "inboxTasks",
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
        return true
    } else {
        return false
    }
}
