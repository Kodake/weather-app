export interface MainData {
    temp: number;
    temp_min: number;
    temp_max: number;
}

export interface WeatherData {
    icon: string;
}

export interface Resultado {
    name?: string;
    main: MainData;
    weather: WeatherData[];
}