let weather = {
  apiKey: "d3480ae5135e7dbe5ba737ee3bdbd366",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" +city + "&units=metric&cnt=1-7&appid=" +
        this.apiKey
      )
      .then((response) => {
       
        if (!response.ok) {
           alert(`No ${city} found.`);
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {

    console.log(data)
    const {
      name
    } = data;
    const {
      icon,
      description
    } = data.weather[0];
    const {
      temp,
      temp_max,
      temp_min,
      humidity
    } = data.main;
    const {
      speed
    } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = Math.round(temp) + "°C";

    // document.querySelector(".max").innerText = "max.t: " + temp_max;
    let max = Math.round(temp_max);
document.querySelector(".max").innerHTML = "max: " + Math.ceil(temp_max) + "°c";
document.querySelector(".min").innerHTML = "min: " + Math.ceil(temp_min) + "°c";

    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
   
    document.querySelector(".info").innerHTML = today();

    function today(){
      const today = new Date();
      const dataDay = today.getDate();
      const dataMonth = today.getMonth();
      const dataYear = today.getFullYear();

      return `${dataDay}.${dataMonth}.${dataYear}`
    }


  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Kiev");



