
document.addEventListener('DOMContentLoaded', () => {
	const rtf = new Intl.RelativeTimeFormat('en');
	const TASK_TEMPLATE = document.getElementById('todo-task-template');
	const localstorageKeyName = 'todotasks';
	const todoInputElement = document.getElementById('todo-input');
	const todoListElement = document.getElementById('todo-list');
	
	const isLocalStorageEnabled = () => {
		try {
			const key = `__storage__test`;
			window.localStorage.setItem(key, null);
			window.localStorage.removeItem(key);
			return true;
		} catch (e) {
			return false;
		}
	};
	
	const todoList = loadTodoList();
	
	function loadTodoList() {
		if (!isLocalStorageEnabled) return [];
		const tasks = JSON.parse(localStorage.getItem(localstorageKeyName) || "[]");
		const todoList = tasks.map(task => {
			task.domElement = createTaskDomElement();
			return task;
		});
		todoList.forEach(task => renderTask(task));
		return todoList;
	};
	
	function saveTodoList() {
		if (!isLocalStorageEnabled) return;
		localStorage.setItem(localstorageKeyName, JSON.stringify(todoList));
	};
	
	function renderTask(task) {
		task.domElement.querySelector('.task-toggle-done input').checked = task.isDone;
		task.domElement.querySelector('.task-toggle-done label > span').textContent = task.isDone ? 'Done':'Undone';
		task.domElement.querySelector('.task-name').textContent = task.txt;
		task.domElement.querySelector('.task-added-time').textContent = timeFormatter(task.addedAt);
		
		task.domElement.querySelector('.task-remove button').addEventListener('click', () => {
			const taskIdx = todoList.indexOf(task);
			if (taskIdx === -1) return;
			todoList.splice(taskIdx, 1);
			task.domElement.remove();
			saveTodoList();
		});
		
		task.domElement.querySelector('.task-toggle-done input').addEventListener('change', () => {
			task.isDone = !task.isDone;
			task.domElement.querySelector('.task-toggle-done label > span').textContent = task.isDone ? 'Done':'Undone';
			task.domElement.classList.toggle('complete', task.isDone);
			saveTodoList();
		});
		
		task.domElement.classList.toggle('complete', task.isDone);
		todoListElement.appendChild(task.domElement);
	};
	
	function createTaskDomElement() {
		const li = document.createElement('li');
		li.appendChild(TASK_TEMPLATE.content.cloneNode(true));
		return li;
	};

    function addTodoTask(taskText) {
		const task = {
			txt: taskText,
			domElement: createTaskDomElement(),
			addedAt: Date.now(),
			isDone: false,
		};
		todoList.push(task);
		renderTask(task);
		saveTodoList();
		return task;
    };

	function timeFormatter(timestamp) {
		let time = Math.ceil(Math.abs(timestamp - Date.now()) / 1000);
		if (time < 60) return rtf.format(time * -1, 'second');
		
		if (time < 3600) {
			time = Math.floor(time / 60);
			return rtf.format(time * -1, 'minute');
		};
		
		if (time < 86400) {
			time = Math.floor(time / 3600);
			return rtf.format(time * -1, 'hour')
		};
		
		if (time < 2592000) {
			time = Math.floor(time / 86400);
			return rtf.format(time * -1, 'day')
		};
		
		if (time < 31104000) {
			time = Math.floor(time / 2592000);
			return rtf.format(time * -1, 'month')
		};
		
		time = Math.floor(time / 31104000);
		return rtf.format(time * -1, 'year');
	};
	
	document.getElementById('todo-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = todoInputElement.value.trim();
        if (taskText === '') return;
        addTodoTask(taskText);
        todoInputElement.value = '';
    });
});




