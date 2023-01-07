let weather = {
  apiKey: "d3480ae5135e7dbe5ba737ee3bdbd366",
  fetchWeather: function (city) {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
      )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const {
      name
    } = data;
    const {
      icon,
      description
    } = data.weather[0];
    const {
      temp,
      humidity
    } = data.main;
    const {
      speed
    } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
    // document.querySelector(".info").innerHTML = weatherToDay(degree);

    function weatherToDay(t) {
      if (t >= 20) {
        console.log('Today is very hot!');
        return 'Today is very hot!';
      } else if (t <= 15) {
        console.log('Today is cold!');
        return 'Today is cold!';
      } else {
        console.log('Today is nice day!');
        return 'Today is nice day!';
      }
      return t;
    }

    let str = document.querySelector(".temp").innerText.slice(0, -2);
    let degree = Number(str)
    document.querySelector(".info").innerHTML = weatherToDay(degree);
    console.log(degree);

    weatherToDay(degree);
    console.log('Temperature - ' + degree + '°C');

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

weather.fetchWeather("Denver");