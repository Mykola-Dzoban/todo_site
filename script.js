const dom = {
    new: document.getElementById('new'),
    add: document.getElementById('add'),
    tasks: document.getElementById('tasks')
};

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
                <label class="todo__checkbox"><input type="checkbox" ${checked}><div></div></label>
                <div class="todo__task-text">${task.text}</div>
                <div class="todo__task-del">-</div>
            </div>
        `;

        htmlList += taskHtml;
    })

    dom.tasks.innerHTML = htmlList;
}