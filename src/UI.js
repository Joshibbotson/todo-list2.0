export default class UI {
    
    createSingleDOMTask(array, key, title, date) {

        let i = array.length - 1
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