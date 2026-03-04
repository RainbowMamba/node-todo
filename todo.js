import fs from "node:fs";

const TODOS_FILE = "todos.json";

function loadTodos() {
  try {
    const data = fs.readFileSync(TODOS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}

function addTodo(content) {
  const todos = loadTodos();
  const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
  todos.push({ id: newId, content, done: false });
  saveTodos(todos);
  console.log(`Todo가 추가되었습니다: ${content}`);
}

function listTodos() {
  const todos = loadTodos();
  if (todos.length === 0) {
    console.log("Todo가 없습니다.");
  } else {
    todos.forEach((todo, index) => {
      const check = todo.done ? "x" : " ";
      console.log(`[${check}] ${index + 1}. ${todo.content}`);
    });
  }
}

function doneTodo(id) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    console.log("해당 ID를 찾을 수 없습니다.");
  } else {
    todo.done = true;
    saveTodos(todos);
    console.log(`ID ${id}번 항목이 완료되었습니다.`);
  }
}

function updateTodo(id, newContent) {
  const todos = loadTodos();
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    console.log("해당 ID를 찾을 수 없습니다.");
  } else if (!newContent) {
    console.log("새 내용을 입력해주세요.");
  } else {
    todo.content = newContent;
    saveTodos(todos);
    console.log(`ID ${id}번 항목이 수정되었습니다: ${newContent}`);
  }
}

function deleteTodo(id) {
  const todos = loadTodos();
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) {
    console.log("해당 ID를 찾을 수 없습니다.");
  } else {
    const [removed] = todos.splice(index, 1);
    todos.forEach((t, i) => { t.id = i + 1; });
    saveTodos(todos);
    console.log(`ID ${id}번 항목이 삭제되었습니다: ${removed.content}`);
  }
}

const [, , command, ...args] = process.argv;

if (command === "add") {
  addTodo(args.join(" "));
} else if (command === "list") {
  listTodos();
} else if (command === "done") {
  doneTodo(parseInt(args[0]));
} else if (command === "update") {
  updateTodo(parseInt(args[0]), args.slice(1).join(" "));
} else if (command === "delete") {
  deleteTodo(parseInt(args[0]));
}
