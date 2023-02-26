import { IWeather } from '../models/weather';
import { ICity } from '../models/city';

export interface IApp {
   isLoading: boolean;
   isSettingsOpen: boolean;
   citiesList: any[];
   activeCity: any;
   weather: IWeather;
};
