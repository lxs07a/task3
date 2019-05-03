import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

//low-level component, 'wrapped component'
function MyButton() {
  return <button>My button</button>;
}

const appendTo = node => BaseComponent => {
  let location;

  //if no location is provided, use default "root"
  if (node === undefined) {
    location = document.getElementById("root");
  }

  //if node id is provided, use it to reach the DOM node
  if (typeof node === "string") {
    location = document.getElementById(node);
    console.log(location);
  }

  //if it's an object, maybe it's a node, if so, use it as a location,
  //otherwise display a warning on line 37
  if (typeof node === "object") {
    location = node;
  }

  //create a portal
  function Portal({ children }) {
    return ReactDOM.createPortal(children, location);
  }

  function AppendTo() {
    if (!location) {
      return <span>No such DOM element</span>;
    } else
      return (
        <Portal>
          <BaseComponent />
        </Portal>
      );
  }
  return AppendTo;
};

//higher order component
const HOC = appendTo("custom")(MyButton);

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <MyButton />
      <HOC />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
