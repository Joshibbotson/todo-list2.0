import {
    deleteTask,
    createTaskDiv,
    editTaskInLocalStorage,
    getProjectFromLocalStorage,
} from "./domCreation"
import { format, isToday, parseISO, differenceInCalendarDays } from "date-fns"
import { da } from "date-fns/locale"
import { projectArr } from "./dom"

export default class UI {
    createSingleDOMTask(array, key, title, date) {
        let tasksArr = JSON.parse(localStorage.getItem(key))
        let i = tasksArr.length - 1
        let formattedDate = new Date(date).toUTCString()

        const main = document.getElementById("main")
        const div = document.createElement("div")
        const dateAndDeleteDiv = document.createElement("div")
        const tickOffBtn = document.createElement("button")
        const deleteBtn = document.createElement("button")
        // const dateInput = document.createElement("input")
        const p = document.createElement("p")
        const pDate = document.createElement("p")

        p.innerHTML = title
        pDate.innerText = date
        pDate.classList.add("date-p")
        pDate.setAttribute("id", "date" + i)

        div.setAttribute("id", i)
        div.classList.add("task-div")

        deleteBtn.innerHTML = "X"
        deleteBtn.setAttribute("id", i)
        deleteBtn.classList.add("task-delete-btn")
        tickOffBtn.setAttribute("id", i)
        tickOffBtn.classList.add("tick-off-btn")
        // dateInput.setAttribute("type", "date")

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
            return deleteTask(i, key, array)
        })

        deleteBtn.addEventListener("click", e => {
            let i = e.target.id
            return deleteTask(i, key, array)
        })

        p.addEventListener("click", e => {
            let i = e.target.parentElement.id
            let target = e.target
            return editTaskInLocalStorage(i, target, key, array, title, date)
        })
        // pDate.addEventListener("click", e => {
        //     let i = e.target.parentElement.id
        //     let target = e.target
        //     return editTaskInLocalStorage(i, target, key, array, title, date)
        // })
        createTaskDiv(array, key)
    }

    createMultipleDOMTask(key, array, index, title, date) {
        let formattedDate = new Date(date).toUTCString()

        const main = document.getElementById("main")
        const div = document.createElement("div")
        const dateAndDeleteDiv = document.createElement("div")
        const deleteBtn = document.createElement("button")
        const tickOffBtn = document.createElement("button")
        // const dateInput = document.createElement("input")
        const p = document.createElement("p")
        const pDate = document.createElement("p")
        p.innerHTML = title
        pDate.innerText = date
        deleteBtn.innerHTML = "X"
        deleteBtn.setAttribute("id", index)
        deleteBtn.classList.add("task-delete-btn")
        tickOffBtn.setAttribute("id", index)
        tickOffBtn.classList.add("tick-off-btn")

        // dateInput.setAttribute("type", "date")

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
            return deleteTask(i, key, array)
        })

        deleteBtn.addEventListener("click", e => {
            let i = e.target.id
            return deleteTask(i, key, array)
        })
        p.addEventListener("click", e => {
            let i = e.target.parentElement.id
            let target = e.target
            console.log(i)
            console.log(target)

            return editTaskInLocalStorage(i, target, key, array, title, date)
        })

        // pDate.addEventListener("click", e => {
        //     let i = e.target.parentElement.id
        //     let target = e.target
        //     console.log(i)
        //     console.log(target)

        //     return editTaskInLocalStorage(i, target, key, array, title, date)
        // })
    }

    createSingleDOMProject(key, array, projectName) {
        let tasksArr = JSON.parse(localStorage.getItem(key))
        let i = tasksArr.length - 1

        const nav = document.querySelector(".nav-btns")
        const newProjectBtn = document.createElement("button")

        newProjectBtn.innerHTML = projectName
        newProjectBtn.setAttribute("id", "project" + i)
        nav.appendChild(newProjectBtn)
    }

    createMultipleDOMProjectBtns(index, projectName) {
        const nav = document.querySelector(".nav-btns")
        const newProjectBtn = document.createElement("button")

        newProjectBtn.innerHTML = projectName
        newProjectBtn.setAttribute("id", "project" + index)
        nav.appendChild(newProjectBtn)

        newProjectBtn.addEventListener("click", () => {
            return getProjectFromLocalStorage("projects", index)
        })
    }

    createModal(text) {
        const body = document.getElementsByTagName("body")
        const div = document.createElement("div")
        div.innerHTML = ` 
    <div class="modal" id="modal1">
        <div class="modal-dialog">
            <header class="modal-header">
                Hello!
                <button
                    class="close-modal"
                    aria-label="close modal"
                    data-close
                >
                    ✕
                </button>
            </header>
            <section class="modal-content">
                ${text}
            </section>
            <footer class="modal-footer">Josh Ibbotson</footer>
        </div>
    </div>`
        body.appendChild(div)
    }

    darkModeToggle() {
        const header = document.getElementsByTagName("header")
        const mainH1 = document.querySelectorAll("h1")
        const footer = document.getElementsByTagName("footer")
        footer[0].style.backgroundColor = "rgb(40, 40, 40)"
        mainH1[1].style.color = "white"
        header[0].style.backgroundColor = "rgb(40, 40, 40)"
        const nav = document.getElementsByTagName("nav")
        nav[0].style.backgroundColor = "rgb(64, 64, 64)"

        const main = document.getElementsByTagName("main")
        const body = document.getElementsByTagName("body")
        main[0].style.backgroundColor = "rgb(150, 150, 150)"
        body[0].style.backgroundColor = "rgb(150, 150, 150)"
    }

    clearDOMTask(event, key, array) {
        // array.forEach(object => {
        //     if (object === event)
        // });
    }
}
