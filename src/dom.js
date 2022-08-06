import {
    pushTaskToLocalStorage,
    getTaskFromLocalStorage,
    clearAllDomTasks,
    clearDOMTask,
    deleteTask,
    inputTitleDOM,
} from "./inboxTodayWeek"

export let dom = {
    main: document.getElementById("main"),
    nav: document.getElementById("nav"),
    inboxBtn: document.getElementById("inbox"),
    todayBtn: document.getElementById("today"),
    thisWeekBtn: document.getElementById("thisWeek"),
    completed: document.getElementById("completed"),
}

export let inboxArr = []
export let todayArr = []
export let thisWeekArr = []
export let completedArr = []

let hamburgerBtnActive = true

export const hamburgerBtn = document
    .querySelector(".hamburger-btn")
    .addEventListener("click", () => {
        hamburgerBtnActive = !hamburgerBtnActive
        if (hamburgerBtnActive === true) {
            dom.nav.classList.remove("active-nav")
        } else if (hamburgerBtnActive === false) {
            dom.nav.classList.add("active-nav")
        }
    })

// assigns id to each of the 3 default inbox types, and adds button highlight on click and removes others highlights.
// note at some point this function will need to bring up the DOM for each associated array

export function navBtnSelection() {
    const navBtnArr = [
        dom.inboxBtn,
        dom.todayBtn,
        dom.thisWeekBtn,
        dom.completed,
    ]

    for (let i = 0; i < navBtnArr.length; i++) {
        navBtnArr[i].setAttribute("id", "navBtn" + i)
    }

    navBtnArr.forEach(btn => {
        btn.addEventListener("click", e => {
            dom.inboxBtn.classList.remove("nav-btn-active")
            dom.todayBtn.classList.remove("nav-btn-active")
            dom.thisWeekBtn.classList.remove("nav-btn-active")
            dom.completed.classList.remove("nav-btn-active")

            e.target.classList.add("nav-btn-active")
        })
    })
}

dom.inboxBtn.addEventListener("click", () => {
    return getTaskFromLocalStorage("inboxTasks", inboxArr)
})

dom.todayBtn.addEventListener("click", () => {
    return getTaskFromLocalStorage("todayTasks", todayArr)
})

dom.thisWeekBtn.addEventListener("click", () => {
    return getTaskFromLocalStorage("thisWeekTasks", thisWeekArr)
})

dom.completed.addEventListener("click", () => {
    return getTaskFromLocalStorage("completed", completedArr)
})
