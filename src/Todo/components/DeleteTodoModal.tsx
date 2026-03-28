import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface props {
    onClickYes?: () => void;
    onClickNo?: () => void;
}

function DeleteTodoModal(props: props) {
    return (
        <>
            <div className="backdrop"></div>
            <div className="delete-todo-modal">
                <span className="icon-container"><FontAwesomeIcon className="icon" icon={faTriangleExclamation} size="xl" /></span>
                <div className="message-container">
                    <h3>Delete Todo</h3>
                    <p>Are you sure you want to delete this todo?</p>
                </div>
                <div className="button-container">
                    <button className="no-button" onClick={props.onClickNo}>No, Keep It.</button>
                    <button className="yes-button" onClick={props.onClickYes}>Yes, Delete!</button>
                </div>
            </div>
        </>
    )
}

export default DeleteTodoModal;