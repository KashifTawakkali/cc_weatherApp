import React from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import Forcast from "./forcast";
import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    city: undefined,
    country: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    main: undefined,
    errorMessage: undefined,
    searchCity: "",
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeatherByCoords(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          this.getWeatherByCoords(28.67, 77.22); // Default location
          alert(
            "You have disabled location services. Allow this app to access your location for real-time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    this.timerID = setInterval(
      () => this.getWeatherByCoords(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getWeatherByCoords = async (lat, lon) => {
    try {
      const api_call = await fetch(
        `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
      );
      const data = await api_call.json();

      if (!data.main || !data.weather) {
        this.setState({ errorMessage: "Unable to fetch weather data." });
        return;
      }

      this.setState({
        lat,
        lon,
        city: data.name,
        country: data.sys.country,
        temperatureC: Math.round(data.main.temp),
        temperatureF: Math.round(data.main.temp * 1.8 + 32),
        humidity: data.main.humidity,
        main: data.weather[0].main,
        icon: this.getWeatherIcon(data.weather[0].main),
      });
    } catch (error) {
      this.setState({ errorMessage: "Error fetching weather data." });
    }
  };

  getWeatherByCity = async (city) => {
    try {
      const api_call = await fetch(
        `${apiKeys.base}current?access_key=${apiKeys.key}&query=${city}`
      );
      const data = await api_call.json();
  
      if (!data.current) {
        this.setState({ errorMessage: "City not found." });
        return;
      }
  
      this.setState({
        lat: data.location.lat,
        lon: data.location.lon,
        city: data.location.name,
        country: data.location.country,
        temperatureC: Math.round(data.current.temperature),
        temperatureF: Math.round(data.current.temperature * 1.8 + 32),
        humidity: data.current.humidity,
        main: data.current.weather_descriptions[0],
        icon: this.getWeatherIcon(data.current.weather_descriptions[0]),
      });
    } catch (error) {
      this.setState({ errorMessage: "Error fetching weather data." });
    }
  };
  

  getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Sunny":
      case "Clear":
        return "CLEAR_DAY";
      case "Partly cloudy":
        return "PARTLY_CLOUDY_DAY";
      case "Cloudy":
        return "CLOUDY";
      case "Rain":
      case "Light rain":
      case "Heavy rain":
        return "RAIN";
      case "Snow":
        return "SNOW";
      case "Fog":
      case "Mist":
        return "FOG";
      default:
        return "CLEAR_DAY";
    }
  };
  

  handleSearchChange = (event) => {
    this.setState({ searchCity: event.target.value });
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.getWeatherByCity(this.state.searchCity);
  };

  render() {
    if (this.state.temperatureC) {
      return (
        <React.Fragment>
          <div className="search-bar">
            <form onSubmit={this.handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search city..."
                value={this.state.searchCity}
                onChange={this.handleSearchChange}
              />
              <button type="submit">Search</button>
            </form>
          </div>

          <div className="city">
            <div className="title">
              <h2>{this.state.city}</h2>
              <h3>{this.state.country}</h3>
            </div>
            <div className="mb-icon">
              <ReactAnimatedWeather
                icon={this.state.icon}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
              <p>{this.state.main}</p>
            </div>
            <div className="date-time">
              <div className="dmy">
                <div className="current-time">
                  <Clock format="HH:mm:ss" interval={1000} ticking={true} />
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
                <p>
                  {this.state.temperatureC}°<span>C</span>
                </p>
              </div>
            </div>
          </div>
          <Forcast icon={this.state.icon} weather={this.state.main} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location will be displayed on the App <br /> & used for calculating real-time weather.
          </h3>
        </React.Fragment>
      );
    }
  }
}

export default Weather;
