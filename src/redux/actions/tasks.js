export const reorderTask = (
  // state,
  columnIndex,
  startTaskIndex,
  endTaskIndex
) => {
  return {
    type: "REORDER_TASK",
    payload: {
      //   state,
      columnIndex,
      startTaskIndex,
      endTaskIndex,
    },
  };
};

export const moveTask = (
  //   state,
  startColumnIndex,
  startTaskIndex,
  endColumnIndex,
  endTaskIndex
) => ({
  type: "MOVE_TASK",
  payload: {
    // state,
    startColumnIndex,
    startTaskIndex,
    endColumnIndex,
    endTaskIndex,
  },
});

export const addTask = (columnIndex, title) => ({
  type: "ADD_TASK",
  payload: { columnIndex, title },
});
