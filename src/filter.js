import { addTask } from "./addtask"
import {
    dom,
    clickEventDeleteBtns,
    inboxArr,
    todayArr,
    thisWeekArr,
} from "./dom"
import UI from "./UI"
import { format } from "date-fns"

export function filterArrayByDate(date) {
    const newDate = new Date(date)
    const formattedDate = format(newDate, "dd/MM/yyyy")
    console.log(formattedDate)
}
