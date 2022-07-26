import React, { useState, useEffect } from "react";
import WeatherCards from "./WeatherCards/WeatherCards";
import DayComponent from "./DayComponent/DayComponent";
import { mockData } from "./mockData.js";
import "./Weather.css";
import { Icon } from "@iconify/react";
import { mockComponent } from "react-dom/test-utils";

const days =
  // converts days (from getDay() method) to their string version
  {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

function calculateRoundedAvg(array) {
  // calculates the average value from an array of numbers and rounds the average to the nearest integer
  const sum = array.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
  const average = sum / array.length;
  const roundedAvg = Math.round(average);
  return roundedAvg;
}

function unixToHoursMins(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return minutes > 9 ? `${hours}:${minutes}` : `${hours}:0${minutes}`;
}

function filterDataByDay(data) {
  return {
    sunday: data.filter((obj) => obj.day === "Sunday"),
    monday: data.filter((obj) => obj.day === "Monday"),
    tuesday: data.filter((obj) => obj.day === "Tuesday"),
    wednesday: data.filter((obj) => obj.day === "Wednesday"),
    thursday: data.filter((obj) => obj.day === "Thursday"),
    friday: data.filter((obj) => obj.day === "Friday"),
    saturday: data.filter((obj) => obj.day === "Saturday"),
  };
}

function getDailyTemps(dailyData, day) {
  // maps over weather data returned from API and returns an array of temps for each day
  return dailyData[day].map((obj) => {
    return Math.round(obj.main.temp);
  });
}

function getDailyHumidity(dailyData, day) {
  // maps over weather data returned from API and returns an array of humidities for each day
  return dailyData[day].map((obj) => {
    return obj.main.humidity;
  });
}

function getDailyWindSpeed(dailyData, day) {
  // maps over weather data returned from API and returns an array of wind speeds data for each day
  return dailyData[day].map((obj) => {
    return obj.wind.speed;
  });
}

function getWeeklyTemps(dailyData) {
  // constructs an object that assigns an array of temps to each day of the week
  return {
    sunday: getDailyTemps(dailyData, "sunday"),
    monday: getDailyTemps(dailyData, "monday"),
    tuesday: getDailyTemps(dailyData, "tuesday"),
    wednesday: getDailyTemps(dailyData, "wednesday"),
    thursday: getDailyTemps(dailyData, "thursday"),
    friday: getDailyTemps(dailyData, "friday"),
    saturday: getDailyTemps(dailyData, "saturday"),
  };
}

function getWeeklyHumidity(dailyData) {
  // constructs an object that assigns an array of humidities to each day of the week
  return {
    sunday: getDailyHumidity(dailyData, "sunday"),
    monday: getDailyHumidity(dailyData, "monday"),
    tuesday: getDailyHumidity(dailyData, "tuesday"),
    wednesday: getDailyHumidity(dailyData, "wednesday"),
    thursday: getDailyHumidity(dailyData, "thursday"),
    friday: getDailyHumidity(dailyData, "friday"),
    saturday: getDailyHumidity(dailyData, "saturday"),
  };
}

function getWeeklyWindSpeed(dailyData) {
  // constructs an object that assigns an array of wind speeds to each day of the week
  return {
    sunday: getDailyWindSpeed(dailyData, "sunday"),
    monday: getDailyWindSpeed(dailyData, "monday"),
    tuesday: getDailyWindSpeed(dailyData, "tuesday"),
    wednesday: getDailyWindSpeed(dailyData, "wednesday"),
    thursday: getDailyWindSpeed(dailyData, "thursday"),
    friday: getDailyWindSpeed(dailyData, "friday"),
    saturday: getDailyWindSpeed(dailyData, "saturday"),
  };
}

function avgDailyHumidity(weeklyHumidity, day) {
  // if there is any data returned from the API for a specific day, return the average humidity for that day
  if (weeklyHumidity[day].length > 0) {
    return calculateRoundedAvg(weeklyHumidity[day]);
    // otherwise return null
  } else {
    return null;
  }
}

function avgDailyWindSpeed(weeklyWindSpeed, day) {
  // if there is any data returned from the API for a specific day, return the average humidity for that day
  if (weeklyWindSpeed[day].length > 0) {
    return calculateRoundedAvg(weeklyWindSpeed[day]);
    // otherwise return null
  } else {
    return null;
  }
}

function getAvgWeeklyHumidity(weeklyHumidity) {
  // constructs an object that contains the average humidity for each day of the week
  return {
    sunday: avgDailyHumidity(weeklyHumidity, "sunday"),
    monday: avgDailyHumidity(weeklyHumidity, "monday"),
    tuesday: avgDailyHumidity(weeklyHumidity, "tuesday"),
    wednesday: avgDailyHumidity(weeklyHumidity, "wednesday"),
    thursday: avgDailyHumidity(weeklyHumidity, "thursday"),
    friday: avgDailyHumidity(weeklyHumidity, "friday"),
    saturday: avgDailyHumidity(weeklyHumidity, "saturday"),
  };
}

function getAvgWeeklyWindSpeed(weeklyWindSpeed) {
  // constructs an object that contains the average wind speed for each day of the week
  return {
    sunday: avgDailyWindSpeed(weeklyWindSpeed, "sunday"),
    monday: avgDailyWindSpeed(weeklyWindSpeed, "monday"),
    tuesday: avgDailyWindSpeed(weeklyWindSpeed, "tuesday"),
    wednesday: avgDailyWindSpeed(weeklyWindSpeed, "wednesday"),
    thursday: avgDailyWindSpeed(weeklyWindSpeed, "thursday"),
    friday: avgDailyWindSpeed(weeklyWindSpeed, "friday"),
    saturday: avgDailyWindSpeed(weeklyWindSpeed, "saturday"),
  };
}

function minMaxTempsByDay(weeklyTemps, day) {
  // if there is any data returned from the API for a specific day, return the max and min temps for that day
  if (weeklyTemps[day].length > 0) {
    return {
      max: Math.max(...weeklyTemps[day]),
      min: Math.min(...weeklyTemps[day]),
    };
    // otherwise return null
  } else {
    return null;
  }
}

function minMaxTempsByWeek(weeklyTemps) {
  // constructs an object that assigns the min/max temps for a specific day
  return {
    sunday: minMaxTempsByDay(weeklyTemps, "sunday"),
    monday: minMaxTempsByDay(weeklyTemps, "monday"),
    tuesday: minMaxTempsByDay(weeklyTemps, "tuesday"),
    wednesday: minMaxTempsByDay(weeklyTemps, "wednesday"),
    thursday: minMaxTempsByDay(weeklyTemps, "thursday"),
    friday: minMaxTempsByDay(weeklyTemps, "friday"),
    saturday: minMaxTempsByDay(weeklyTemps, "saturday"),
  };
}

// Functional component starts here
function Weather() {
  const [error, setError] = useState();
  const [inputField, setinputField] = useState("");
  const [city, setCity] = useState("London");
  const [currentWeather, setCurrentWeather] = useState({
    temp: 30,
    icon: "09d",
    day: "friday",
  });
  const [temp, setTemp] = useState({
    sunday: { max: 5, min: 10 },
    monday: { max: 5, min: 10 },
    tuesday: { max: 5, min: 10 },
    wednesday: { max: 5, min: 10 },
    thursday: { max: 5, min: 10 },
    friday: { max: 5, min: 10 },
    saturday: { max: 5, min: 10 },
  });
  const [humidity, setHumidity] = useState({
    sunday: 43,
    monday: 40,
    tuesday: 39,
    wednesday: 28,
    thursday: 19,
    friday: 24,
    saturday: 34,
  });
  const [wind, setWind] = useState({
    sunday: 12,
    monday: 18,
    tuesday: 10,
    wednesday: 8,
    thursday: 14,
    friday: 9,
    saturday: 12,
  });
  const [sun, setSun] = useState({
    sunrise: "05:00",
    sunset: "20:00",
  });

  // allows page to render correctly before fetching any data
  // if (formattedData.list[0].day) {
  // console.log("dataList: ", formattedData.list);

  // }

  function onChange(e) {
    setinputField(e.target.value);
  }

  function onClickSearch() {
    // if there is only whitespace in the searchbar, return without doing anything
    if (inputField.replace(/^\s+|\s+$/g, "") === "") {
      return;
    }
    setCity(inputField);
    setinputField("");
  }

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER}`
        );
        const data = await res.json();

        // converts date from API to corresponding day of the week
        const listWithDay = data.list.map((object) => {
          const date = new Date(`${object.dt_txt}`);
          const day = days[`${date.getDay()}`];
          return { ...object, day: day };
        });

        const UNIXSunriseSunset = {
          sunrise: data.city.sunrise,
          sunset: data.city.sunset,
        };

        // offset due to british summer time/weird interaction with API
        const summertimeOffset = 3600;

        const actualSunriseSunset = {
          sunrise:
            UNIXSunriseSunset.sunrise + data.city.timezone - summertimeOffset,
          sunset:
            UNIXSunriseSunset.sunset + data.city.timezone - summertimeOffset,
        };

        const convertSunriseSunset = {
          sunrise: unixToHoursMins(actualSunriseSunset.sunrise),
          sunset: unixToHoursMins(actualSunriseSunset.sunset),
        };

        // gives data in the format for our use case
        const formattedData = {
          ...data,
          list: listWithDay,
          city: {
            sunrise: convertSunriseSunset.sunrise,
            sunset: convertSunriseSunset.sunset,
          },
        };

        // // converts date from API to corresponding day of the week
        // const listWithDay = mockData.list.map((object) => {
        //   const date = new Date(`${object.dt_txt}`);
        //   const day = days[`${date.getDay()}`];
        //   return { ...object, day: day };
        // });

        // const UNIXSunriseSunset = {
        //   sunrise: mockData.city.sunrise,
        //   sunset: mockData.city.sunset,
        // };

        // // offset due to british summer time/weird interaction with API
        // const summertimeOffset = 3600;

        // const actualSunriseSunset = {
        //   sunrise:
        //     UNIXSunriseSunset.sunrise + mockData.city.timezone - summertimeOffset,
        //   sunset:
        //     UNIXSunriseSunset.sunset + mockData.city.timezone - summertimeOffset,
        // };

        // const convertSunriseSunset = {
        //   sunrise: unixToHoursMins(actualSunriseSunset.sunrise),
        //   sunset: unixToHoursMins(actualSunriseSunset.sunset),
        // };

        // // gives data in the format for our use case
        // const formattedData = {
        //   ...mockData,
        //   list: listWithDay,
        //   city: {
        //     sunrise: convertSunriseSunset.sunrise,
        //     sunset: convertSunriseSunset.sunset,
        //   },
        // };
        // console.log("%c Formatted Data:", "color: red", formattedData);

        const dailyData = filterDataByDay(formattedData.list);

        // extracts all necessary TEMPERATURE data from the data returned from the API
        const weeklyTemps = getWeeklyTemps(dailyData);

        let minMaxTemps = minMaxTempsByWeek(weeklyTemps);

        // extracts all necessary HUMIDITY data from the data returned from the API
        const weeklyHumidity = getWeeklyHumidity(dailyData);

        const avgWeeklyHumidity = getAvgWeeklyHumidity(weeklyHumidity);

        // extracts all necessary WIND data from the data returned from the API
        const weeklyWindSpeed = getWeeklyWindSpeed(dailyData);

        const avgWeeklyWindSpeed = getAvgWeeklyWindSpeed(weeklyWindSpeed);

        setError("no error");

        setCurrentWeather((currentWeather) => {
          return {
            ...currentWeather,
            temp: Math.round(formattedData.list[0].main.temp),
            icon: formattedData.list[0].weather[0].icon,
            day: formattedData.list[0].day,
          };
        });

        setTemp((temp) => {
          return {
            ...temp,
            sunday:
              minMaxTemps.sunday === null
                ? null
                : { max: minMaxTemps.sunday.max, min: minMaxTemps.sunday.min },
            monday:
              minMaxTemps.monday === null
                ? null
                : { max: minMaxTemps.monday.max, min: minMaxTemps.monday.min },
            tuesday:
              minMaxTemps.tuesday === null
                ? null
                : {
                    max: minMaxTemps.tuesday.max,
                    min: minMaxTemps.tuesday.min,
                  },
            wednesday:
              minMaxTemps.wednesday === null
                ? null
                : {
                    max: minMaxTemps.wednesday.max,
                    min: minMaxTemps.wednesday.min,
                  },
            thursday:
              minMaxTemps.thursday === null
                ? null
                : {
                    max: minMaxTemps.thursday.max,
                    min: minMaxTemps.thursday.min,
                  },
            friday:
              minMaxTemps.friday === null
                ? null
                : { max: minMaxTemps.friday.max, min: minMaxTemps.friday.min },
            saturday:
              minMaxTemps.saturday === null
                ? null
                : {
                    max: minMaxTemps.saturday.max,
                    min: minMaxTemps.saturday.min,
                  },
          };
        });

        setHumidity((humidity) => {
          return {
            ...humidity,
            sunday:
              avgWeeklyHumidity.sunday === null
                ? null
                : avgWeeklyHumidity.sunday,
            monday:
              avgWeeklyHumidity.monday === null
                ? null
                : avgWeeklyHumidity.monday,
            tuesday:
              avgWeeklyHumidity.tuesday === null
                ? null
                : avgWeeklyHumidity.tuesday,
            wednesday:
              avgWeeklyHumidity.wednesday === null
                ? null
                : avgWeeklyHumidity.wednesday,
            thursday:
              avgWeeklyHumidity.thursday === null
                ? null
                : avgWeeklyHumidity.thursday,
            friday:
              avgWeeklyHumidity.friday === null
                ? null
                : avgWeeklyHumidity.friday,
            saturday:
              avgWeeklyHumidity.saturday === null
                ? null
                : avgWeeklyHumidity.saturday,
          };
        });

        setWind((wind) => {
          return {
            ...wind,
            sunday:
              avgWeeklyWindSpeed.sunday === null
                ? null
                : avgWeeklyWindSpeed.sunday,
            monday:
              avgWeeklyWindSpeed.monday === null
                ? null
                : avgWeeklyWindSpeed.monday,
            tuesday:
              avgWeeklyWindSpeed.tuesday === null
                ? null
                : avgWeeklyWindSpeed.tuesday,
            wednesday:
              avgWeeklyWindSpeed.wednesday === null
                ? null
                : avgWeeklyWindSpeed.wednesday,
            thursday:
              avgWeeklyWindSpeed.thursday === null
                ? null
                : avgWeeklyWindSpeed.thursday,
            friday:
              avgWeeklyWindSpeed.friday === null
                ? null
                : avgWeeklyWindSpeed.friday,
            saturday:
              avgWeeklyWindSpeed.saturday === null
                ? null
                : avgWeeklyWindSpeed.saturday,
          };
        });

        setSun((sun) => {
          return {
            ...sun,
            sunrise: formattedData.city.sunrise,
            sunset: formattedData.city.sunset,
          };
        });
      } catch (error) {
        setError(error);
      }
    }
    getData();
  }, [city]);

  return (
    <div>
      <h2 className="page-title"> Weather Forecast</h2>
      <div className="Weather">
        <div className="weather-searchbar-div">
          <input
            className="weather-input"
            type="text"
            value={inputField}
            onChange={onChange}
            placeholder="Search City..."
          />

          <span className="search-icon">
            <Icon
              icon="akar-icons:search"
              inline={true}
              onClick={onClickSearch}
            />
          </span>
        </div>
      </div>
      <div className="weather-today">
        <img
          className="weather-icon"
          src={`http://openweathermap.org/img/wn/${currentWeather.icon}@2x.png`}
          alt="Current Weather"
        />
        <div className="city-temp">
          <p className="current-temp">{`${currentWeather.temp}\u00B0`}</p>
          <h3 className="city-name">{`${
            error === "no error"
              ? city.charAt(0).toUpperCase() + city.slice(1)
              : ""
          }`}</h3>
        </div>
      </div>
      <div className="Weather">
        <div className="weekly-forecast-div">
          <DayComponent temp={temp} day="sunday" />
          <DayComponent temp={temp} day="monday" />
          <DayComponent temp={temp} day="tuesday" />
          <DayComponent temp={temp} day="wednesday" />
          <DayComponent temp={temp} day="thursday" />
          <DayComponent temp={temp} day="friday" />
          <DayComponent temp={temp} day="saturday" />
        </div>
      </div>
      <div className="weather-cards-div">
        <div className="weather-cards-top">
          <WeatherCards
            title="Humidity"
            data={humidity[currentWeather.day.toLowerCase()]}
            unit="%"
          />
          <WeatherCards title="Sunrise" data={sun.sunrise} unit="" />
        </div>
        <div className="weather-cards-bottom">
          <WeatherCards
            title="Wind"
            data={wind[currentWeather.day.toLowerCase()]}
            unit="m/s"
          />
          <WeatherCards title="Sunset" data={sun.sunset} unit="" />
        </div>
      </div>
    </div>
  );
}

export default Weather;
