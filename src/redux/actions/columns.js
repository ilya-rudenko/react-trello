export const addColumn = (name) => ({
  type: "ADD_COLUMN",
  payload: name,
});

export const deleteColumn = (columnIndex) => ({
  type: "DELETE_COLUMN",
  payload: columnIndex,
});

export const reorderColumns = (
  draggableId,
  startColumnIndex,
  endColumnIndex
) => ({
  type: "REORDER_COLUMNS",
  payload: { draggableId, startColumnIndex, endColumnIndex },
});
