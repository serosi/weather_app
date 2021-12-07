$(document).ready(function () {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=818154f9875973e95a27ec8b0fc7191b";
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
  console.log(moment().format('LT')[6])

  if(moment().format('LT')[6] === 'P'){
    if(data.weather[0].main === "Clouds"){
      $(".card-img" ).attr("src", "./assets/background/bg_night_partlycloudy.png");
      $(".current-icon").attr("src","./assets/icons/icon_cloudy.png");
    }else if(data.weather[0].main === "Snow"){
      $(".card-img" ).attr("src", "./assets/background/bg_night_snow.png");
      $(".current-icon").attr("src","./assets/icons/icon_snow.png");
    }else if(data.weather[0].main === "Sunny"){
      $(".card-img" ).attr("src", "./assets/background/bg_night_sunny.png");
      $(".current-icon").attr("src","./assets/icons/icon_sunny.png");
    }else if(data.weather[0].main === "Rain"){
      $(".card-img" ).attr("src", "./assets/background/bg_night_rain.png");
      $(".current-icon").attr("src","./assets/icons/icon_rain.png"); //No rain icon 
    }else if(data.weather[0].main === "Clear"){
      $(".card-img" ).attr("src", "./assets/background/bg_night_clear.png");
      $(".current-icon").attr("src","./assets/icons/icon_sunny.png");
    }else{
      $(".card-img").attr("src", "./assets/background/bg_night_mist.png");
      $(".current-icon").attr("src","./assets/icons/icon_mist.png");
    }
  }else if(moment().format('LT')[6] === 'A'){
    if(data.weather[0].main === "Clouds"){
      $(".card-img" ).attr("src", "./assets/background/bg_day_partlycloudy.png");
      $(".current-icon").attr("src","./assets/icons/icon_cloudy.png");
    }else if(data.weather[0].main === "Snow"){
      $(".card-img" ).attr("src", "./assets/background/bg_day_snow.png");
      $(".current-icon").attr("src","./assets/icons/icon_snow.png");
    }else if(data.weather[0].main === "Sunny"){
      $(".card-img" ).attr("src", "./assets/background/bg_day_sunny.png");
      $(".current-icon").attr("src","./assets/icons/icon_sunny.png");
    }else if(data.weather[0].main === "Rain"){
      $(".card-img" ).attr("src", "./assets/background/bg_day_rain.png");
      $(".current-icon").attr("src","./assets/icons/icon_rain.png"); 
    }else if(data.weather[0].main === "Clear"){
      $(".card-img" ).attr("src", "./assets/background/bg_day_clear.png");
      $(".current-icon").attr("src","./assets/icons/icon_sunny.png");
    }else{
      $(".card-img").attr("src", "./assets/background/bg_day_mist.png");
      $(".current-icon").attr("src","./assets/icons/icon_mist.png");
    }
  }

  $(".current-day").text(data.name + " (" + moment().format("MM/D/YYYY") + ")");
  $(".currentTemp").text(tempF + " °F");
  $(".currentHumidity").text(data.main.humidity);
  $(".currentWindSpeed").text(data.wind.speed);

  getUVIndex(data.coord.lat, data.coord.lon);
};

var getUVIndex = function (lat, lon) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=818154f9875973e95a27ec8b0fc7191b";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        $(".currentUV").text(data.value);
        console.log(data);
        if (data.value < 2.01) {
          console.log('in')
          $(".currentUV").addClass("badge-sucess");
        } else if (data.value > 2 && data.value < 5.01) {
          $(".currentUV").addClass("badge-warning");
        } else if (data.value > 5 && data.value < 7.01) {
          $(".currentUV").addClass("badge-high");
        } else if (data.value > 7 && data.value < 10.01) {
          $(".currentUV").addClass("badge-danger");
        } else if (data.value > 10) {
          $(".currentUV").addClass("badge-extreme");
        }
      });
    }
  });
};

var displayForecast = function (city) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=818154f9875973e95a27ec8b0fc7191b";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      //storeLocal(city);

      response.json().then(function (data) {  
        for (let i = 1; i < 6; i++) {
          var tempF = (((data.list[i].main.temp - 273.15) * 9) / 5 + 32).toFixed(2);

          if(moment().format('LT')[6] === 'P'){
            if(data.list[i].weather[0].main === "Clouds"){
            $("#bg" + i).attr("src", "./assets/background/bg_night_partlycloudy.png");
            $("#icon" + i).attr("src", "./assets/icons/icon_partlycloudy.png");
          }else if(data.list[i].weather[0].main === "Rain"){
             $("#bg" + i).attr("src", "./assets/background/bg_night_rain.png");
             $("#icon" + i).attr("src","./assets/icons/icon_rain.png"); 
          }else if(data.list[i].weather[0].main === "Clear"){
            $("#bg" + i).attr("src", "./assets/background/bg_night_clear.png"); //No Day clear
            $("#icon" + i).attr("src","./assets/icons/icon_sunny.png");
          }else if(data.list[i].weather[0].main === "Snow"){
            $("#bg" + i).attr("src", "./assets/background/bg_night_snow.png");
            $("#icon" + i).attr("src","./assets/icons/icon_snow.png");
          }else if(data.list[i].weather[0].main === "Sunny"){
            $("#bg" + i).attr("src", "./assets/background/bg_night_clear.png");
            $("#icon" + i).attr("src","./assets/icons/icon_sunny.png");
          }else{
            $("#bg" + i).attr("src", "./assets/background/bg_night_mist.png");
            $("#icon" + i).attr("src","./assets/icons/icon_mist.png");
          }
          }else if(moment().format('LT')[6] === 'A'){
            if(data.list[i].weather[0].main === "Clouds"){
              $("#bg" + i).attr("src", "./assets/background/bg_day_partlycloudy.png");
              $("#icon" + i).attr("src", "./assets/icons/icon_partlycloudy.png");
            }else if(data.list[i].weather[0].main === "Rain"){
               $("#bg" + i).attr("src", "./assets/background/bg_day_rain.png");
               $("#icon" + i).attr("src","./assets/icons/icon_rain.png"); 
            }else if(data.list[i].weather[0].main === "Clear"){
              $("#bg" + i).attr("src", "./assets/background/bg_day_clear.png");
              $("#icon" + i).attr("src","./assets/icons/icon_sunny.png");
            }else if(data.list[i].weather[0].main === "Snow"){
              $("#bg" + i).attr("src", "./assets/background/bg_day_snow.png");
              $("#icon" + i).attr("src","./assets/icons/icon_snow.png");
            }else if(data.list[i].weather[0].main === "Sunny"){
              $("#bg" + i).attr("src", "./assets/background/bg_day_clear.png");
              $("#icon" + i).attr("src","./assets/icons/icon_sunny.png");
            }else{
              $("#bg" + i).attr("src", "./assets/background/bg_day_mist.png");
              $("#icon" + i).attr("src","./assets/icons/icon_mist.png");
            }
          }

          $(".forecastDay" + i).text(moment().add(i, "d").format("MM/D/YYYY"));
          $(".forecastTemp" + i).text(tempF + " °F");
          $(".forecastWind" + i).text(" " + data.list[i].wind.speed);
          $(".forecastHumidity" + i).text(" " + data.list[i].main.humidity);
        }
      });
    }
  });
};

/*var storeLocal = function (userInput) {
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
};*/

let storedCities = JSON.parse(localStorage.getItem('storedCities')) || [];

checkLocalStorage = () => {
   storedCities = JSON.parse(localStorage.getItem('storedCities')) || [];
};


var displaySearchHistory = function (cityName) {
  checkLocalStorage();
  for (let i = 0; i < localStorage.length; i++) {
    var liEl = $(
      `<button type='button' class='list-group-item list-group-item-action' id='${cityName}'>${cityName}</li>`
    );
    liEl.appendTo(".search-history");
  }
};

var checkIfCityButtonExists = function(userInput){
  checkLocalStorage();
  let cityExists = false;
  for (i = 0; i < storedCities.length; i++) {
     if (city === storedCities[i]) {
        cityExists = true;
        return cityExists;
     }
  };
  return cityExists;
}

