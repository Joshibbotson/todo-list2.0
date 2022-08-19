import {
    deleteTask,
    completeTask,
    createTaskDiv,
    editTaskInLocalStorage,
} from "./inboxTodayWeekCompleted tabs"
import { format } from "date-fns"

export default class UI {
    createSingleDOMTask(array, key, title, date) {
        let tasksArr = JSON.parse(localStorage.getItem(key))
        let i = tasksArr.length - 1

        const main = document.getElementById("main")
        const div = document.createElement("div")
        const dateAndDeleteDiv = document.createElement("div")
        const tickOffBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")
        const p = document.createElement("p")
        const pDate = document.createElement("p")

        p.innerHTML = title
        if (date !== "") {
            pDate.innerHTML = format(new Date(date), "dd MMM-yyyy")
        } else {
            pDate.innerHTML = ""
        }
        pDate.classList.add("date-p")
        pDate.setAttribute("id", "date" + i)

        div.setAttribute("id", i)
        div.classList.add("task-div")

        deleteBtn.innerHTML = "X"
        deleteBtn.setAttribute("id", i)
        deleteBtn.classList.add("task-delete-btn")
        tickOffBtn.setAttribute("id", i)
        tickOffBtn.classList.add("tick-off-btn")

        dateAndDeleteDiv.classList.add("date-and-delete-container")
        dateAndDeleteDiv.setAttribute("id", "dateAndDeleteContainer" + i)

        dateAndDeleteDiv.appendChild(pDate)
        dateAndDeleteDiv.appendChild(deleteBtn)

        div.appendChild(tickOffBtn)
        div.appendChild(p)
        div.appendChild(dateAndDeleteDiv)

        main.appendChild(div)

        tickOffBtn.addEventListener("click", e => {
            let i = e.target.id
            return completeTask(i, key, array)
        })

        deleteBtn.addEventListener("click", e => {
            let i = e.target.id
            return deleteTask(i, key, array)
        })

        p.addEventListener("click", e => {
            let i = e.target.parentElement.id
            let target = e.target
            e.stopPropagation()

            return editTaskInLocalStorage(i, target, key, array, title, date)
        })
        createTaskDiv(key)
    }

    createMultipleDOMTask(key, array, index, title, date) {
        const main = document.getElementById("main")
        const div = document.createElement("div")
        const dateAndDeleteDiv = document.createElement("div")
        const deleteBtn = document.createElement("button")
        const tickOffBtn = document.createElement("button")

        const p = document.createElement("p")
        const pDate = document.createElement("p")
        p.innerHTML = title
        if (date !== "") {
            pDate.innerHTML = format(new Date(date), "dd MMM-yyyy")
        } else {
            pDate.innerHTML = ""
        }
        deleteBtn.innerHTML = "X"
        deleteBtn.setAttribute("id", index)
        deleteBtn.classList.add("task-delete-btn")
        tickOffBtn.setAttribute("id", index)
        tickOffBtn.classList.add("tick-off-btn")

        pDate.setAttribute("id", "date" + index)
        pDate.classList.add("date-p")

        div.setAttribute("id", index)
        div.classList.add("task-div")

        dateAndDeleteDiv.classList.add("date-and-delete-container")
        dateAndDeleteDiv.setAttribute("id", "dateAndDeleteContainer" + index)

        dateAndDeleteDiv.appendChild(pDate)
        dateAndDeleteDiv.appendChild(deleteBtn)
        div.appendChild(tickOffBtn)
        div.appendChild(p)
        div.appendChild(dateAndDeleteDiv)

        main.appendChild(div)

        tickOffBtn.addEventListener("click", e => {
            let i = e.target.id
            return completeTask(i, key, array)
        })

        deleteBtn.addEventListener("click", e => {
            let i = e.target.id
            return deleteTask(i, key, array)
        })
        p.addEventListener("click", e => {
            let i = e.target.parentElement.id
            let target = e.target
            e.stopPropagation()
            return editTaskInLocalStorage(i, target, key, array, title, date)
        })
    }

    createMultipleDOMCompletedTasks(key, array, index, title, date) {
        const main = document.getElementById("main")
        const div = document.createElement("div")
        const dateAndDeleteDiv = document.createElement("div")
        const deleteBtn = document.createElement("button")
        const p = document.createElement("p")
        const pDate = document.createElement("p")
        p.innerHTML = title
        p.style.textDecoration = "line-through"
        if (date !== "") {
            pDate.innerHTML = format(new Date(date), "dd MMM-yyyy")
        } else {
            pDate.innerHTML = ""
        }
        deleteBtn.innerHTML = "X"
        deleteBtn.setAttribute("id", index)
        deleteBtn.classList.add("task-delete-btn")

        pDate.setAttribute("id", "date" + index)
        pDate.classList.add("date-p")
        pDate.style.textDecoration = "line-through"

        div.setAttribute("id", index)
        div.classList.add("task-div-completed")

        dateAndDeleteDiv.classList.add("date-and-delete-container")
        dateAndDeleteDiv.setAttribute("id", "dateAndDeleteContainer" + index)

        dateAndDeleteDiv.appendChild(pDate)
        dateAndDeleteDiv.appendChild(deleteBtn)
        div.appendChild(p)
        div.appendChild(dateAndDeleteDiv)

        main.appendChild(div)

        deleteBtn.addEventListener("click", e => {
            let i = e.target.id
            return deleteTask(i, key, array)
        })
    }
}
