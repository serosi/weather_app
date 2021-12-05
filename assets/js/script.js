$(document).ready(function () {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=818154f9875973e95a27ec8b0fc7191b";
  defaultCity(apiUrl);
});

$(".search-btn").on("click", function (event) {
  event.preventDefault();
  var userInput = $(".search-input").val();
  if (userInput === "") {
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=818154f9875973e95a27ec8b0fc7191b";
  } else {
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      userInput +
      "&appid=818154f9875973e95a27ec8b0fc7191b";
  }

  defaultCity(apiUrl);
});

var getUrl = function (cityName) {
  if (cityName === "") {
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=818154f9875973e95a27ec8b0fc7191b";
  } else {
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=818154f9875973e95a27ec8b0fc7191b";
  }

  defaultCity(apiUrl);
};

var defaultCity = function (apiUrl) {
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayCurrentCity(data);
        displayForecast(data.name);
      });
    } else {
      alert("Error");
    }
  });
};


var displayCurrentCity = function (data) {
  var tempF = (((data.main.temp - 273.15) * 9) / 5 + 32).toFixed(2);

  if(data.weather[0].main === "Clouds"){
    $(".card-img" ).attr("src", "./assets/background/bg_day_partlycloudy.png");
    $(".current-icon").attr("src","./assets/icons/icon_cloudy.png");
  }
  else if(data.weather[0].main === "Snow"){
    $(".card-img" ).attr("src", "./assets/background/bg_day_snow.png");
    $(".current-icon").attr("src","./assets/icons/icon_snow.png");
  }else if(data.weather[0].main === "Sunny"){
    $(".card-img" ).attr("src", "./assets/background/bg_day_sunny.png");
    $(".current-icon").attr("src","./assets/icons/icon_sunny.png");
  }


  $(".current-day").text(data.name + " (" + moment().format("MM/D/YYYY") + ")");
  $(".currentTemp").text(tempF + " °F");
  $(".currentHumidity").text(data.main.humidity);
  $(".currentWindSpeed").text(data.wind.speed);

  getUVIndex(data.coord.lat, data.coord.lon);
};

var getUVIndex = function (lat, lon) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/uvi?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=818154f9875973e95a27ec8b0fc7191b";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        $(".currentUV").text(data.value);
        if (data.value < 2 || data.value === 2) {
          $(".currentUV").addClass("badge-sucess");
        } else if (data.value > 2 && data.value < 5) {
          $(".currentUV").addClass("badge-warning");
        } else if (data.value === 5) {
          $(".currentUV").addClass("badge-warning");
        } else if (data.value > 5 && data.value < 7) {
          $(".currentUV").addClass("badge-high");
        } else if (data.value === 7) {
          $(".currentUV").addClass("badge-high");
        } else if (data.value > 7 && data.value < 10) {
          $(".currentUV").addClass("badge-danger");
        } else if (data.value === 10) {
          $(".currentUV").addClass("badge-danger");
        } else if (data.value > 11) {
          $(".currentUV").addClass("badge-extreme");
        } else if (data.value === 11) {
          $(".currentUV").addClass("badge-extreme");
        }
      });
    }
  });
};

var displayForecast = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=818154f9875973e95a27ec8b0fc7191b";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      storeLocal(city);
      response.json().then(function (data) {

        /*console.log(data.list[1].weather);
        console.log(data.list[2].weather);
        console.log(data.list[3].weather);
        console.log(data.list[4].weather);
        console.log(data.list[5].weather);*/
        

        for (let i = 1; i < 6; i++) {
          var tempF = (
            ((data.list[i].main.temp - 273.15) * 9) / 5 +
            32
          ).toFixed(2);

          /*console.log(data.list[i]);

          if(data.list[i].weather[0].main === "Clouds"){
            //$(".card-img-top").attr("src", "./assets/background/bg_night_partlycloudy.png");
            $(".img" + i).attr("src", "./assets/background/bg_night_partlycloudy.png");
          }else if(data.list[i].weather[0].main === "Rain"){
             $(".img" + i).attr("src", "./assets/background/bg_day_rain.png");
          }*/
          
          /*var forecastBackground = data.list[i].weather.main;
          if(forecastBackground === "Clouds"){
            $(".card-img-top" + i).attr("src", "./assets/background/bg_night_partlycloudy.png");
            //$(".current-card").style.backgroundImage = "url('./assets/background/bg_day_rain.png')";
            //$(".current-card").style.backgroundImage("src", "./assets/background/bg_day_rain.png");
          }else if(forecastBackground=== "Rain"){
            $(".card-img-top" + i).attr("src", "./assets/background/bg_day_rain.png");
          }else if(forecastBackground === "Snow"){
            $(".card-img-top" + i).attr("src", "./assets/background/bg_day_snow.png");
          }else{
            $(".card-img-top" ).attr("src", "./assets/background/bg_day_snow.png");
          }*/

          displayCardImg(data.list[i],i);
          $(".forecastDay" + i).text(moment().add(i, "d").format("MM/D/YYYY"));
          $(".current-icon" + i).attr(
            "src",
            "https://openweathermap.org/img/wn/" +
              data.list[i].weather[0].icon +
              ".png"
          );
          $(".forecastTemp" + i).text(tempF + " °F");
          $(".forecastWind" + i).text(" " + data.list[i].wind.speed);
          $(".forecastHumidity" + i).text(" " + data.list[i].main.humidity);
        }
      });
    }
  });
};

var storeLocal = function (userInput) {
  localStorage.setItem("record", JSON.stringify(userInput));
  var liEl = document.createElement("li");
  liEl.classList.add("list-group-item", "list-group-item-action");
  liEl.id = userInput;
  liEl.textContent = userInput;
  liEl.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      getUrl(e.target.textContent);
    }
  });
  document.querySelector(".search-history").appendChild(liEl);
};

var displaySearchHistory = function (cityName) {
  for (let i = 0; i < localStorage.length; i++) {
    var liEl = $(
      `<button type='button' class='list-group-item list-group-item-action' id='${cityName}'>${cityName}</li>`
    );
    liEl.appendTo(".search-history");
  }
};
