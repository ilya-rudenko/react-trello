import uuid from "react-uuid";

const initialState = [
  {
    id: uuid(),
    title: "To do now",
    tasks: [
      { id: uuid(), title: "Wash the dishes" },
      { id: uuid(), title: "Buy a bread" },
      { id: uuid(), title: "Start a new project" },
    ],
  },
  {
    id: uuid(),
    title: "To do later",
    tasks: [{ id: uuid(), title: "Hang out with friends" }],
  },
  {
    id: uuid(),
    title: "Done",
    tasks: [{ id: uuid(), title: "Clean up the room" }],
  },
];

const columnsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COLUMN": {
      return [
        ...state,
        {
          id: uuid(),
          title: action.payload,
          tasks: [],
        },
      ];
    }
    case "REORDER_TASK": {
      //console.log(action.payload);
      let newColumn = state.filter(
        (column) => column.id === action.payload.columnIndex
      )[0];
      //console.log(newColumn);

      newColumn.tasks.splice(
        action.payload.endTaskIndex,
        0,
        newColumn.tasks.splice(action.payload.startTaskIndex, 1)[0]
      );

      return state.map((column, index) =>
        index === action.payload.columnIndex ? newColumn : column
      );
    }
    case "MOVE_TASK": {
      let startColumn = state.filter(
        (column) => column.id === action.payload.startColumnIndex
      )[0];
      let endColumn = state.filter(
        (column) => column.id === action.payload.endColumnIndex
      )[0];

      //console.log(startColumn, endColumn);

      let task = startColumn.tasks.splice(action.payload.startTaskIndex, 1)[0];

      endColumn.tasks.splice(action.payload.endTaskIndex, 0, task);
      startColumn.tasks.splice(action.payload.startTaskIndex, 0);

      return state.map((column, index) =>
        index === action.payload.startColumnIndex
          ? startColumn
          : index === action.payload.endColumnIndex
          ? endColumn
          : column
      );
    }
    case "ADD_TASK": {
      let newColumn = state.filter(
        (column) => column.id === action.payload.columnIndex
      )[0];
      // console.log(action.payload.columnIndex, state);
      newColumn.tasks.push({ id: uuid(), title: action.payload.title });

      return state.map((column) =>
        column.id === action.payload.columnIndex ? newColumn : column
      );
    }

    case "DELETE_COLUMN": {
      let index = state.findIndex((column) => column.id === action.payload);
      // console.log(action.payload, state, index);
      let newState = [...state];
      newState.splice(index, 1);
      // console.log(newState);
      return newState;
    }

    case "REORDER_COLUMNS": {
      // console.log(state);
      let newState = [...state];
      let newColumn = newState.filter(
        (column) => action.payload.draggableId === column.id
      )[0];
      newState.splice(action.payload.startColumnIndex, 1);

      newState.splice(action.payload.endColumnIndex, 0, newColumn);

      // console.log(newState);

      return newState;
      // return state.map((column, index) =>
      //   index === action.payload.columnIndex ? newColumn : column
      // );

      // console.log(
      //   action.payload.startColumnIndex,
      //   action.payload.endColumnIndex,
      //   startColumn
      // );

      // return state;
    }

    default:
      return state;
  }
};

export default columnsReducer;
