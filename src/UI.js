export default class UI {
    
    createSingleDOMTask(array, key, title, date) {
        console.log(key)
        let tasksArr = JSON.parse(localStorage.getItem(key))
        console.log(tasksArr)
        console.log(array)
        let i = tasksArr.length - 1
        console.log(i)
        const main = document.getElementById('main')
        const div = document.createElement('div')
        const btn = document.createElement('button')
        const p = document.createElement('p')
        p.innerHTML = title + '   - ' + date
        div.setAttribute('id', (i))
        div.classList.add("task-div")
    
    
        div.appendChild(p)
    
        main.appendChild(div)

        // div.addEventListener('click', (e) => {
        // })

    }

    createMultipleDOMTask(array, index, title, date) {
        const main = document.getElementById('main')
        const div = document.createElement('div')
        const btn = document.createElement('button')
        const p = document.createElement('p')
        p.innerHTML = title + '   - ' + date
        div.setAttribute('id', (index))
        div.classList.add("task-div")
    
    
        div.appendChild(p)
    
        main.appendChild(div)

        // div.addEventListener('click', (e) => {
        // })

    }

    clearDOMTask(event, key, array) {
        // array.forEach(object => {
        //     if (object === event)
        // });
    }
}