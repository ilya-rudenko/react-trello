import React, { Fragment } from "react";
import "./Task.css";

const Task = ({ text }) => {
  return <div className="task">{text}</div>;
};

export default Task;
