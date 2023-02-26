import axios from 'axios';
import { WEATHER_API } from '../consts/api';
import { WEATHER_KEY } from '../consts/keys';

export function getWeather(city: any) {
  const { center } = city;
  const [lon, lat] = center;

  return axios
    .get(`${WEATHER_API}?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`)
    .then((response) => response.data);
}
