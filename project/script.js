// 要素取得
const input = document.getElementById("todoText");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const filterButtons = document.querySelectorAll(".filters button");

// ローカルストレージから読み込み
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 初期表示
renderTodos();

// 追加ボタン
addBtn.addEventListener("click", addTodo);

// Enterキーでも追加
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

// Todo追加
function addTodo() {
  const text = input.value.trim();
  if (text === "") return;

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();
  renderTodos();

  input.value = "";
}

// Todo表示
function renderTodos(filter = "all") {
  todoList.innerHTML = "";

  const filtered = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  filtered.forEach(todo => {
    const li = document.createElement("li");

    // チェックボックス
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveTodos();
      renderTodos(filter);
    });

    // テキスト
    const span = document.createElement("span");
    span.textContent = todo.text;

    if (todo.completed) {
      li.classList.add("completed");
    }

    // 削除ボタン
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      todos = todos.filter(t => t.id !== todo.id);
      saveTodos();
      renderTodos(filter);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

// ローカルストレージ保存
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// フィルター切り替え
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    renderTodos(filter);
  });
});
