import {hamburgerBtn, navBtnSelection, dom} from './dom'
import { inboxArr } from './dom'
import {pushTaskToLocalStorage} from './domCreation'

navBtnSelection()

dom.addTaskBtn.addEventListener('click', () => {
    return pushTaskToLocalStorage("inboxTasks", inboxArr, dom.titleInput.value, dom.dateInput.value)
});