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

const [, , command, ...args] = process.argv;

if (command === "add") {
  const content = args.join(" ");
  const todos = loadTodos();
  const newId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
  todos.push({ id: newId, content, done: false });
  saveTodos(todos);
  console.log(`Todo가 추가되었습니다: ${content}`);
}
