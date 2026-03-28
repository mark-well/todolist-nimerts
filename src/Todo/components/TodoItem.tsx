import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type ChangeEvent } from "react";

interface props {
    todo: string;
    completed: boolean;
    onDelete?: () => void;
    onChecked?: (completed: boolean) => void;
}

function TodoItem(props: props) {
    const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChecked?.(event.target.checked);
    }

    return (
        <div className={`todo-item ${props.completed ? "checked" : ""}`}>
            <div className="todo-wrapper">
                <input type="checkbox" checked={props.completed} onChange={handleCheckBox} />
                <p className="todo__content">{props.todo}</p>
            </div>
            <button className="trash-button" onClick={props.onDelete}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
    )
}

export default TodoItem;