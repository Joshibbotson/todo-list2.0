export default class UI {
    
    createDOMTask(key, title, date) {
        const main = document.getElementById('main')
        const div = document.createElement('div')
        const btn = document.createElement('button')
        const p = document.createElement('p')
        p.innerHTML = title + date
        div.setAttribute('id', `${key} + 'task'`)
        
    
        div.appendChild(p)
    
        main.appendChild(div)

    }

    clearDOMTask() {

    }
}