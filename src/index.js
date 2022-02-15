import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function App() {
  useEffect(() => {
    console.log("starting");
    
    const VM = require("sablejs/runtime")();
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

    const vAjax = vm.createFunction("ajax", function (vOption) {
      const option = {};
      const vUrl = vm.getProperty(vOption, "url");
      const vMethod = vm.getProperty(vOption, "method");
      const vSuccess = vm.getProperty(vOption, "success");

      if (vm.isString(vUrl)) {
        option.url = vm.asString(vUrl);
      }
  
      if (vm.isString(vMethod)) {
        option.method = vm.asString(vMethod);
      }
  
      if (vm.isFunction(vSuccess)) {
        option.success = function(response) {
          vm.call(
            vSuccess,
            vm.createUndefined(),
            vm.createString(response)
          );
        };
      }

      function send(option) {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = option.withCredentials || false;
        xhr.open((option.method || "GET").toLowerCase(), option.url, true);
      
        xhr.onload = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const response = xhr.responseText;
            option.success(response);
          }
        };

        xhr.send(null);
      }
  
      send(option);
      return vm.createUndefined();
    });

    vm.setProperty(vGlobal, "ajax", vAjax);
    vm.setProperty(vGlobal, "console", vConsole);
    vm.setProperty(vConsole, "log", vLog);

    (async () => {
      const resp = await fetch("./output.txt");
      const data = await resp.text();
      vm.run(data);
      // vm.destroy();
    })();
  }, []);

  return <div>JS safty</div>;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
