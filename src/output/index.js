console.log("hello");

ajax({
  url: "https://api.apishop.net/common/weather/get15DaysWeatherByArea",
  method: "GET",
  success: function (response) {
    var test = '666';
  },
});