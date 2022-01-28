function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}

function test() {
  ajax({
    url: "https://api.apishop.net/common/weather/get15DaysWeatherByArea",
    method: "GET",
    success: function() {
      console.log('success');
    }
  })
}
// var xmlhttp = new XMLHttpRequest();

// if (xmlhttp != null) {
//   xmlhttp.onreadystatechange = ajaxHandler;
//   xmlhttp.open(
//     "GET",
//     "https://api.apishop.net/common/weather/get15DaysWeatherByArea",
//     true
//   );
//   xmlhttp.send(null);
// }

// function ajaxHandler() {
//   if (xmlhttp.readyState == 4) {
//     // 4 = "loaded"
//     if (xmlhttp.status == 200) {
//       // 200 = OK
//       // ...our code here...
//       console.log(xmlhttp.responseText);
//     } else {
//       console.log("Problem retrieving XML data");
//     }
//   }
// }

// console.log(window);

var start = Date.now();
console.log("[INFO] fib: " + fib(30));
console.log("[INFO] time consuming: " + (Date.now() - start) + "ms");
test();
