const dom = {
    new: document.getElementById('new'),
    add: document.getElementById('add'),
    tasks: document.getElementById('tasks'),
    count: document.getElementById('count')
};

//tasks array

const tasks = [];

// click on ADD button

dom.add.onclick = () => {
    const newTaskText = dom.new.value;
    if(newTaskText && isNotHaveTask(newTaskText, tasks)){
        addTask(newTaskText, tasks);
        dom.new.value = '';
        tasksRender(tasks);
    }
}

// function that add new task

function addTask(text, list){
    const timeStamp = Date.now();
    const task = {
        id: timeStamp,
        text,
        isComplete: false
    };
    list.push(task);
}

// check task in array

function isNotHaveTask(text, list){
    let isNotHave = true;
    list.forEach((task) => {
        if(task.text === text){
            alert('Task already exist!');
            isNotHave = false;
        }
    });
    return isNotHave;
}

// function that show new task on screen

function tasksRender(list){
    let htmlList = '';

    list.forEach((task) => {
        const cls = task.isComplete ? 'todo__task todo__task_complete' : 'todo__task';
        const checked = task.isComplete ? 'checked' : ''

        const taskHtml = `
            <div id="${task.id}" class="${cls}">
                <label class="todo__checkbox"><input type="checkbox" ${checked}><div class="todo__checkbox-div"></div></label>
                <div class="todo__task-text">${task.text}</div>
                <div class="todo__task-del">-</div>
            </div>
        `;

        htmlList += taskHtml;
    })

    dom.tasks.innerHTML = htmlList;
    renderTasksCount(list);
}

// check click on checkbox

dom.tasks.onclick = (event) => {
    const target = event.target;
    const isCheckboxEl = target.classList.contains('todo__checkbox-div');
    const isDelEl = target.classList.contains('todo__task-del');
    if(isCheckboxEl){
        const task = target.parentElement.parentElement;
        const taskId = task.getAttribute('id');
        changeTaskStatus(taskId, tasks);
        tasksRender(tasks);
    }
    if(isDelEl){
        const task = target.parentElement;
        const taskId = task.getAttribute('id');
        deleteTask(taskId, tasks);
        tasksRender(tasks);
    }
}

// function that change task status

function changeTaskStatus(id, list){
    list.forEach((task) => {
        if(task.id == id){
            task.isComplete = !task.isComplete;
        }
    })
}

// function that delete task

function deleteTask(id, list){
    list.forEach((task, idx) => {
        if(task.id == id){
            list.splice(idx, 1);
        }
    })
}

// tasks counter

function renderTasksCount(list){
    dom.count.innerHTML = list.length;
}