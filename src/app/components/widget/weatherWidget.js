"use client";
import { useEffect, useState } from "react";
import WidgetWrapper from "./widgetWrapper";
import Spinner from "../spinner";
import Image from "next/image";
export default function WeatherWidget() {

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true)
  const API_KEY_WEATHER = process.env.NEXT_PUBLIC_API_KEY_WEATHER;

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY_WEATHER}&q=57.7089,11.9746&aqi=no`
        );
        let data = await response.json();
        console.log("response", response, "data", data);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getWeatherData();
  }, []);

  return (
    <WidgetWrapper>
      {loading || !weatherData ?  <Spinner /> : (
        <div>
          <p>{weatherData.location.name}</p>
          <p>{weatherData.current.temp_c} °C</p>
          <p>{weatherData.current.condition.text}</p>
          <Image
            src={`https:${weatherData.current.condition.icon}`}
            alt="weather icon"
            width={64}
            height={64}
            priority
          />
        </div>
      )}
      <p>weather</p>
    </WidgetWrapper>
  );
}
