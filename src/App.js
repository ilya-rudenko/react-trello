import "./App.css";
import React from "react";

import { Header, Columns } from "./components";

const App = () => {
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div>
        <Columns />
      </div>
    </div>
  );
};

export default App;
