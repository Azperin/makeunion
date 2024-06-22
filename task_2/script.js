document.addEventListener('DOMContentLoaded', () => {
	const todoInput = document.getElementById('todo-input');
	const todoList = document.getElementById('todo-list');
	
    document.getElementById('todo-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText === '') return;
        addTodoItem(taskText);
        todoInput.value = '';
    });

    function addTodoItem(taskText) {
        const li = document.createElement('li');
        const span = document.createElement('span');
		
        span.textContent = taskText;
        span.addEventListener('click', () => {
            span.parentElement.classList.toggle('completed');
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    };
});




