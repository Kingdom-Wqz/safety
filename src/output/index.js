ajax({
  url: "https://api.apishop.net/common/weather/get15DaysWeatherByArea",
  method: "GET",
  success: function (response) {
    console.log(response);
  },
});