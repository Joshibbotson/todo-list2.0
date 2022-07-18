import { pushTaskToLocalStorage, getTaskFromLocalStorage, clearAllDomTasks, clearDOMTask, deleteTask, inputTitleDOM } from "./domCreation"

export let dom = {
    main : document.getElementById('main'),
    nav : document.getElementById('nav'),
    inboxBtn : document.getElementById('inbox'),
    todayBtn : document.getElementById('today'),
    thisWeekBtn : document.getElementById('thisWeek'),
    addTaskBtn : document.getElementById('addTaskBtn'),
    titleInput : document.getElementById('titleInput'),
    dateInput : document.getElementById('dateInput')
}

export let inboxArr = []
export let todayArr = []
export let thisWeekArr = []

let hamburgerBtnActive = true

export const hamburgerBtn = document.querySelector(".hamburger-btn").addEventListener('click', () =>{
    hamburgerBtnActive = !hamburgerBtnActive
    if (hamburgerBtnActive === true){
        dom.nav.classList.remove('inactive-nav')

    }
    else if (hamburgerBtnActive === false){
        dom.nav.classList.add('inactive-nav')
    }
    
})


// assigns id to each of the 3 default inbox types, and adds button highlight on click and removes others highlights.
// note at some point this function will need to bring up the DOM for each associated array

export function navBtnSelection(){

    const navBtnArr = [dom.inboxBtn, dom.todayBtn, dom.thisWeekBtn]

    for (let i = 0; i < navBtnArr.length; i++) {
        navBtnArr[i].setAttribute('id', 'navBtn'+i)
    }

    navBtnArr.forEach(btn => {
        btn.addEventListener('click', (e) => {
            dom.inboxBtn.classList.remove("nav-btn-active")
            dom.todayBtn.classList.remove("nav-btn-active")
            dom.thisWeekBtn.classList.remove("nav-btn-active")
            e.target.classList.add("nav-btn-active")
            })
});
}

dom.addTaskBtn.addEventListener('click', () => {
    return pushTaskToLocalStorage("inboxTasks", inboxArr, dom.titleInput.value, dom.dateInput.value)
});

dom.inboxBtn.addEventListener('click', () => {

    return getTaskFromLocalStorage("inboxTasks", inboxArr)
});

dom.todayBtn.addEventListener('click', () => {
    
    return getTaskFromLocalStorage("todayTasks", todayArr)
});

dom.thisWeekBtn.addEventListener('click', () => {
    return getTaskFromLocalStorage("weekTasks", thisWeekArr)
});


