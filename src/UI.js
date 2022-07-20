import {
    deleteTask,
    createTaskDiv,
    editTaskInLocalStorage,
} from "./domCreation"

export default class UI {
    createSingleDOMTask(array, key, title, date) {
        let tasksArr = JSON.parse(localStorage.getItem(key))
        let i = tasksArr.length - 1

        const main = document.getElementById("main")
        const div = document.createElement("div")
        const dateAndDeleteDiv = document.createElement("div")
        const tickOffBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")
        const dateInput = document.createElement("INPUT")
        const p = document.createElement("p")
        p.innerHTML = title + "   - " + date
        div.setAttribute("id", i)
        div.classList.add("task-div")

        deleteBtn.innerHTML = "X"
        deleteBtn.setAttribute("id", i)
        deleteBtn.classList.add("task-delete-btn")
        tickOffBtn.setAttribute("id", i)
        tickOffBtn.classList.add("tick-off-btn")
        dateInput.setAttribute("type", "date")

        dateAndDeleteDiv.classList.add("date-and-delete-container")
        dateAndDeleteDiv.appendChild(dateInput)
        dateAndDeleteDiv.appendChild(deleteBtn)

        div.appendChild(tickOffBtn)
        div.appendChild(p)
        div.appendChild(dateAndDeleteDiv)

        main.appendChild(div)

        tickOffBtn.addEventListener("click", e => {
            let i = e.target.id
            return deleteTask(i, key, array)
        })

        deleteBtn.addEventListener("click", e => {
            let i = e.target.id
            return deleteTask(i, key, array)
        })

        p.addEventListener("dblclick", e => {
            let i = e.target.parentElement.id
            return editTaskInLocalStorage(i, key, array)
        })
        createTaskDiv(array, key)
    }

    createMultipleDOMTask(key, array, index, title, date) {
        const main = document.getElementById("main")
        const div = document.createElement("div")
        const dateAndDeleteDiv = document.createElement("div")
        const deleteBtn = document.createElement("button")
        const tickOffBtn = document.createElement("button")
        const dateInput = document.createElement("INPUT")
        const p = document.createElement("p")
        p.innerHTML = title + "   - " + date
        deleteBtn.innerHTML = "X"
        deleteBtn.setAttribute("id", index)
        deleteBtn.classList.add("task-delete-btn")
        tickOffBtn.setAttribute("id", index)
        tickOffBtn.classList.add("tick-off-btn")

        dateInput.setAttribute("type", "date")

        div.setAttribute("id", index)
        div.classList.add("task-div")

        dateAndDeleteDiv.classList.add("date-and-delete-container")
        dateAndDeleteDiv.appendChild(dateInput)
        dateAndDeleteDiv.appendChild(deleteBtn)
        div.appendChild(tickOffBtn)
        div.appendChild(p)
        div.appendChild(dateAndDeleteDiv)

        main.appendChild(div)

        tickOffBtn.addEventListener("click", e => {
            let i = e.target.id
            return deleteTask(i, key, array)
        })

        deleteBtn.addEventListener("click", e => {
            let i = e.target.id
            return deleteTask(i, key, array)
        })
    }

    clearDOMTask(event, key, array) {
        // array.forEach(object => {
        //     if (object === event)
        // });
    }
}
