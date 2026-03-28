import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dbAddTodo, dbDeleteTodo, dbGetTodos, dbUpdateTodo } from "../../db/db";

export interface ITodo {
    id: number;
    todo: string;
    completed: boolean;
}

interface TodoContextType {
    todos: ITodo[];
    addTodo: (text: string) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, completed: boolean) => void;
}

const TodoContext = createContext<TodoContextType | null>(null);
export function TodoProvider({ children }: { children: ReactNode }) {
    const [todos, setTodos] = useState<ITodo[]>([]);

    //Get all todos from localstorage
    useEffect(() => {
        setTodos(dbGetTodos());
    }, []);

    function addTodo(todo: string) {
        const newTodo: ITodo = {
            id: Date.now(),
            todo: todo,
            completed: false
        }
        setTodos([...todos, newTodo]);
        dbAddTodo(newTodo);
    }

    function deleteTodo(id: number) {
        setTodos(prev => prev.filter(todos => todos.id !== id));
        dbDeleteTodo(id);
    }

    function updateTodo(id: number, completed: boolean) {
        setTodos(prev => prev.map(todo =>
            todo.id == id ? { ...todo, completed: completed } : todo
        ));

        dbUpdateTodo(id, completed);
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, deleteTodo, updateTodo }}>
            {children}
        </TodoContext.Provider>
    );
}

export function useTodos() {
    const context = useContext(TodoContext);
    if (!context) throw Error("useTodo must be inside TodoProvider");
    return context;
}