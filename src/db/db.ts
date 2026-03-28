import type { ITodo } from "../Todo/context/TodoContext";

const key: string = "todos";
function initializeStorage() {
    const todos: ITodo[] = [];
    localStorage.setItem(key, JSON.stringify(todos));
}

function saveDb(todos: ITodo[]) {
    localStorage.setItem(key, JSON.stringify(todos));
}

export function dbGetTodos() {
    const todos: string | null = localStorage.getItem(key);
    if (todos == null) {
        initializeStorage();
    } else {
        return JSON.parse(todos);
    }
}

export function dbAddTodo(todo: ITodo) {
    const todos: ITodo[] = dbGetTodos();
    if (!todo) throw new Error("Todo is empty");
    todos.push(todo);
    saveDb(todos);
}

export function dbDeleteTodo(id: number) {
    const todos: ITodo[] = dbGetTodos();
    if (id == undefined || id == null) throw new Error("Todo does not exist");
    const updatedStorage = todos.filter(todo => todo.id !== id);
    saveDb(updatedStorage);
}

export function dbUpdateTodo(id: number, completed: boolean) {
    const todos: ITodo[] = dbGetTodos();
    if (id === undefined || id === null) throw new Error("Todo does not exist");
    const updatedStorage = todos.map(todo => todo.id == id ? { ...todo, completed } : todo);
    saveDb(updatedStorage);
}