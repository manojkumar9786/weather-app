import React from "react";

const CurrentWeather = ({ data, city }) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className="bg-blue-600 text-white p-6 rounded-xl flex justify-between">
      <div>
        <h2 className="text-2xl">
          {city} ({data.dt_txt.split(" ")[0]})
        </h2>
        <h6>Temperature: {(data.main.temp - 273.15).toFixed(2)}°C</h6>
        <h6>Wind: {data.wind.speed} M/S</h6>
        <h6>Humidity: {data.main.humidity}%</h6>
        <h6>Time : {getCurrentDateTime()}</h6>
      </div>
      <div className="text-center">
        <img
          className="mx-auto"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt="weather-icon"
        />
        <h6 className="capitalize -mt-12">{data.weather[0].description}</h6>
      </div>
    </div>
  );
};


export default CurrentWeather;