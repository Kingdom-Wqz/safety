import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function App() {
  useEffect(() => {
    console.log("starting");

    const VM = require("sablejs/runtime")();
    // import console.log function to vm call
    const vm = new VM();
    const vGlobal = vm.getGlobal();
    const vConsole = vm.createObject();
    const vLog = vm.createFunction("log", function () {
      const temp = [];
      for (let i = 0; i < arguments.length; i++) {
        temp.push(vm.asString(arguments[i]));
      }

      console.log(...temp);
      return vm.createUndefined();
    });

    vm.setProperty(vConsole, "log", vLog);
    vm.setProperty(vGlobal, "console", vConsole);

    (async () => {
      const resp = await fetch("./output.txt");
      const data = await resp.text();
      vm.run(data);
      vm.destroy();
    })();
  }, []);

  return <div>JS safety</div>;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
