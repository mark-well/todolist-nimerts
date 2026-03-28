import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import TodoItem from "./TodoItem"
import DeleteTodoModal from "./DeleteTodoModal";
import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";

function TodoContainer() {
    const { todos, addTodo, deleteTodo, updateTodo } = useTodos();
    const [todoInput, setTodoInput] = useState<string>("");
    const [todoToDelete, setTodoToDelete] = useState<number>(0);
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const handleDeleteModalYes = () => {
        deleteTodo(todoToDelete);
        setTodoToDelete(0);
        setDeleteModalVisible(false);
    }

    const handleDeleteModalNo = () => {
        setDeleteModalVisible(false);
    }

    const handleDeleteTodo = (id: number) => {
        setTodoToDelete(id);
        setDeleteModalVisible(true);
    }

    const handleAddTodo = () => {
        if (todoInput == "") {
            alert("Input is empty");
            return;
        }

        addTodo(todoInput);
        setTodoInput("");
    }

    const handleUpdateTodo = (id: number, completed: boolean) => {
        updateTodo(id, completed);
    }

    const handleTodoInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoInput(event.target.value);
    }

    const handleTodoInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == "Enter") {
            handleAddTodo();
        }
    }

    return (
        <div className="container">
            {deleteModalVisible && <DeleteTodoModal onClickYes={handleDeleteModalYes} onClickNo={handleDeleteModalNo} />}
            <h1>Todo List</h1>
            <div className="input-container">
                <input type="text" value={todoInput} onChange={handleTodoInputChange} onKeyDown={handleTodoInputKeyDown} />
                <button onClick={handleAddTodo}><FontAwesomeIcon icon={faPlus} size="lg" /></button>
            </div>
            <div className="todo-container">
                {
                    todos.map(todo => <TodoItem key={todo.id} todo={todo.todo} completed={todo.completed} onChecked={(completed) => handleUpdateTodo(todo.id, completed)} onDelete={() => handleDeleteTodo(todo.id)} />)
                }
            </div>
        </div>
    )
}


export default TodoContainer