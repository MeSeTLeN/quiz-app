import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Quiz from "./component/Quiz";

function App() {
  return (
    <div>
      <Quiz />
    </div>
  );
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
