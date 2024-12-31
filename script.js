document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTaskButton = document.getElementById('add-task');
    const todoList = document.getElementById('todo-list');
    const itemsLeft = document.getElementById('items-left');
    const clearCompletedButton = document.getElementById('clear-completed');
    const filterButtons = document.querySelectorAll('.filter-button');
  
    let todos = [];
  
    const updateItemsLeft = () => {
      const activeCount = todos.filter(todo => !todo.completed).length;
      itemsLeft.textContent = $`{activeCount}-tasks-left`;
    };
  
    const renderTodos = (filter = 'all') => {
      todoList.innerHTML = '';
      const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
      });
  
      filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
          <span class="todo-text">${todo.text}</span>
          <input type="checkbox" class="toggle-completed" ${
            todo.completed ? 'checked' : ''
          } data-index="${index}">
        `;
        todoList.appendChild(li);
      });
  
      updateItemsLeft();
    };
  
    addTaskButton.addEventListener('click', () => {
      const text = todoInput.value.trim();
      if (text) {
        todos.push({ text, completed: false });
        todoInput.value = '';
        renderTodos();
      }
    });
  
    todoList.addEventListener('change', (e) => {
      if (e.target.classList.contains('toggle-completed')) {
        const index = e.target.dataset.index;
        todos[index].completed = e.target.checked;
        renderTodos();
      }
    });
  
    clearCompletedButton.addEventListener('click', () => {
      todos = todos.filter(todo => !todo.completed);
      renderTodos();
    });
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.id.replace('filter-', '');
        renderTodos(filter);
      });
    });
  
    renderTodos();
  });