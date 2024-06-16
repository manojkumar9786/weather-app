import React from "react";

const FiveDayForecast = ({ forecasts }) => {
  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold">5-Day Forecast :</h2>
      <ul className="flex flex-wrap gap-4">
        {forecasts.map((forecast, index) => (
          <li
            key={index}
            className="bg-gray-600 text-white p-4 rounded w-full md:w-[18.5%]"
          >
            <h3>({forecast.dt_txt.split(" ")[0]})</h3>
            <img
              className="mx-auto lg:w-20"
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@4x.png`}
              alt="weather-icon"
            />
            <h6>Temp: {(forecast.main.temp - 273.15).toFixed(2)}°C</h6>
            <h6>Wind: {forecast.wind.speed} M/S</h6>
            <h6>Humidity: {forecast.main.humidity}%</h6>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FiveDayForecast;
