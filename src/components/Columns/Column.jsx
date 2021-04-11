import React, { Fragment, useState } from "react";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import "./Column.css";
import Task from "../Tasks/Task";
import uuid from "react-uuid";

const Column = ({ title, tasks, id, addTask, deleteColumn, columnIndex }) => {
  const [isInputShown, setIsInputShown] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const dispatch = useDispatch();

  const handleOnAddTask = () => {
    if (valueInput) {
      dispatch(addTask(id, valueInput));
    } else {
      alert("Input the task");
    }
    handleOnCancelTask();
  };

  const handleOnCancelTask = () => {
    setValueInput("");
    setIsInputShown(false);
  };

  const handleOnDeleteColumn = () => {
    dispatch(deleteColumn(id));
    // console.log(12);
  };

  return (
    <Draggable draggableId={id} index={columnIndex}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="columnWrapper"
        >
          <div {...provided.dragHandleProps} className="columnTitle">
            {title}
            <button className="closeButton" onClick={handleOnDeleteColumn}>
              ×
            </button>
          </div>
          {/* {title} */}
          <Droppable droppableId={id} type="task">
            {(provided) => (
              <Fragment>
                <ul
                  className="tasks"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          key={index}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task text={task.title} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <li>
                    {isInputShown ? (
                      <div>
                        <input
                          type="text"
                          className="input"
                          onChange={(e) => {
                            setValueInput(e.target.value);
                          }}
                        />
                        <div className="taskButtons">
                          <button
                            className="addTaskButton"
                            onClick={handleOnAddTask}
                          >
                            Add task
                          </button>
                          <button
                            className="cancelTaskButton"
                            onClick={handleOnCancelTask}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Fragment>
                        <button
                          className="showInputFormButton"
                          onClick={() => setIsInputShown(true)}
                        >
                          Add task
                        </button>
                      </Fragment>
                    )}
                  </li>
                </ul>
              </Fragment>
            )}
          </Droppable>
        </li>
      )}
    </Draggable>
  );
};
export default Column;
