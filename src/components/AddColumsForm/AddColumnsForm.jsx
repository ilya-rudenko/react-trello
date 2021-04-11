import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./AddColumnsForm.css";

const AddColumnsForm = ({ onAddColumn }) => {
  const [isFormShown, setIsFormShown] = useState(false);
  const [valueInput, setValueInput] = useState("");
  const dispatch = useDispatch();

  const handleOnAddColumn = () => {
    if (valueInput) {
      dispatch(onAddColumn(valueInput));
    } else {
      alert("Input the column name");
    }
    handleOnCancelColumn();
  };

  const handleOnCancelColumn = () => {
    setValueInput("");
    setIsFormShown(false);
  };

  return isFormShown ? (
    <div className="column">
      <input
        type="text"
        onChange={(e) => {
          if (e.keyCode === 13) handleOnAddColumn();
          console.log(e.keyCode);
          setValueInput(e.target.value);
        }}
      />
      <div className="buttons">
        <button className="addColumnButton" onClick={handleOnAddColumn}>
          Add column
        </button>
        <button className="cancelColumnButton" onClick={handleOnCancelColumn}>
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <div className="secondaryButton" onClick={() => setIsFormShown(true)}>
      + Add new column
    </div>
  );
};

export default AddColumnsForm;
