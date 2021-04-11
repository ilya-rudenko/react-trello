import React from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Column from "./Column";
import "./Columns.css";

import {
  addColumn,
  deleteColumn,
  reorderColumns,
} from "../../redux/actions/columns";
import { reorderTask, moveTask, addTask } from "../../redux/actions/tasks";
import AddColumnForm from "../AddColumsForm/AddColumnsForm";

const Columns = () => {
  const dispatch = useDispatch();
  const columnsList = useSelector(({ columns }) => columns);

  React.useEffect(() => {
    //dispatch(addColumn("fri"));
  }, []);

  const handleOnTaskDrag = (result) => {
    // console.log(result);
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (type === "column") {
      dispatch(reorderColumns(draggableId, source.index, destination.index));
    }
    if (type === "task") {
      if (destination.droppableId === source.droppableId) {
        dispatch(
          reorderTask(destination.droppableId, source.index, destination.index)
        );
      } else {
        dispatch(
          moveTask(
            source.droppableId,
            source.index,
            destination.droppableId,
            destination.index
          )
        );
      }
    }
  };

  return (
    <div className="columns">
      <DragDropContext onDragEnd={handleOnTaskDrag}>
        <Droppable
          droppableId="allColumns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="columnsList"
              style={{
                gridTemplateColumns: `repeat(${
                  columnsList.length + 1
                },${"13vw"})`,
              }} //repeat
            >
              {columnsList.map((column, index) => (
                <Column
                  key={column.id}
                  title={column.title}
                  tasks={column.tasks}
                  id={column.id}
                  addTask={addTask}
                  deleteColumn={deleteColumn}
                  columnIndex={index}
                />
              ))}
              {provided.placeholder}
              <li>
                <AddColumnForm onAddColumn={addColumn} />
              </li>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   //console.log(state.columns);
//   return {
//     columns: state.columns,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addColumn: (name) => {
//       console.log(name);
//       return dispatch(addColumn(name));
//     },
//   };
// };

export default Columns;
