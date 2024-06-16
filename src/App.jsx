import React, { useState, useEffect } from "react";
import logo from "../public/download-removebg-preview (1).png";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import CurrentWeather from "./components/CurrentWeather";
import FiveDayForecast from "./components/FiveDayForecast";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const API_KEY = "b28e7a65d65681be1cabbdfa09a638f9"; // API key for OpenWeatherMap API

  const fetchWeatherDetails = async (cityName, latitude, longitude) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    try {
      const response = await fetch(WEATHER_API_URL);
      const data = await response.json();

      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          uniqueForecastDays.push(forecastDate);
          return true;
        }
        return false;
      });

      setWeatherData({ cityName, forecasts: fiveDaysForecast });
      setCity("");
    } catch {
      alert("An error occurred while fetching the weather forecast!");
    }
  };

  const fetchCityCoordinates = async () => {
    if (!city.trim()) return;
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (!data.length) return alert(`No City found for ${city}`);
      const { lat, lon, name } = data[0];
      fetchWeatherDetails(name, lat, lon);
    } catch {
      alert("An error occurred while fetching the coordinates!");
    }
  };

  const fetchUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          const { name } = data[0];
          fetchWeatherDetails(name, latitude, longitude);
        } catch {
          alert("An error occurred while fetching the city name!");
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert(
            "Geolocation request denied. Please reset location permission to grant access again."
          );
        } else {
          alert("Geolocation request error. Please reset location permission.");
        }
      }
    );
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center dark:bg-gray-900 bg-gray-200">
      <nav className="flex justify-between w-full px-8 py-2 items-center border-b border-b-gray-400 shadow-xl">
        <img src={logo} alt="" className="w-20" />
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-gray-700 text-white rounded"
        >
          {darkMode ? (
            <MdLightMode size={25} />
          ) : (
            <MdOutlineLightMode size={25} />
          )}
        </button>
      </nav>
      <div className="container mx-auto flex flex-col md:flex-row gap-8 p-8">
        <div className="w-full md:w-1/3">
          <div className="mb-6">
            <h3 className="text-lg mb-2">Enter a City Name</h3>
            <input
              className="w-full p-2 border border-gray-300 text-black rounded focus:outline-none focus:border-blue-600"
              type="text"
              placeholder="E.g., Mumbai, Chennai, Delhi"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 mb-4 rounded hover:bg-blue-700 transition duration-200"
            onClick={fetchCityCoordinates}
          >
            Search
          </button>
          <div className="text-center my-4">or</div>
          <button
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition duration-200"
            onClick={fetchUserCoordinates}
          >
            Use Current Location
          </button>
        </div>
        <div className="w-full md:w-2/3">
          {weatherData && (
            <div className="space-y-8">
              <CurrentWeather
                data={weatherData.forecasts[0]}
                city={weatherData.cityName}
              />
              <FiveDayForecast forecasts={weatherData.forecasts.slice(1)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
