export interface Busqueda {
    ciudad: string;
    pais: string;
}

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


export interface ClimaProps {
    resultado: Resultado;
}

export interface FormularioProps {
    busqueda: {
        pais: string;
        ciudad: string;
    };
    setBusqueda: React.Dispatch<React.SetStateAction<Busqueda>>;
    setConsultar: React.Dispatch<React.SetStateAction<boolean>>;
}