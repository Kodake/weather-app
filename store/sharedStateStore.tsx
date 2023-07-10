import { makeAutoObservable, runInAction } from 'mobx';
import { Alert, Animated, Keyboard } from 'react-native';
import { Resultado } from '../interfaces/appInterfaces';
import { ALERT_MESSAGES } from '../messages/appMessages';
import axios from 'axios';

class SharedStateStore {
    ciudad: string = '';
    pais: string = '';
    consultar = false;
    resultado: Resultado | null = null;
    bgColor = 'rgb(71, 149, 212)';
    animacionBtn = new Animated.Value(1);

    constructor() {
        makeAutoObservable(this);
    }

    mostrarAlerta() {
        Alert.alert(`${ALERT_MESSAGES.error}`, `${ALERT_MESSAGES.noResults}`, [{ text: `${ALERT_MESSAGES.ok}` }]);
    }

    ocultarTeclado() {
        Keyboard.dismiss();
    }

    setCiudad(ciudad: string): void {
        this.ciudad = ciudad;
    }

    setPais(pais: string): void {
        this.pais = pais;
        this.ocultarTeclado();
    }

    setConsultar(consultar: boolean): void {
        this.consultar = consultar;
    }

    setResultado(resultado: Resultado) {
        this.resultado = resultado;
    }

    setBgColor(bgColor: string) {
        this.bgColor = bgColor;
    }

    animacionEntrada(animacionBtn: Animated.Value) {
        Animated.spring(animacionBtn, {
            toValue: 0.75,
            useNativeDriver: true,
        }).start();
    }

    animacionSalida(animacionBtn: Animated.Value) {
        Animated.spring(animacionBtn, {
            toValue: 1,
            friction: 4,
            tension: 30,
            useNativeDriver: true,
        }).start();
    }

    consultarClima = () => {
        if (this.ciudad.trim() === '' || this.pais.trim() === '') {
            this.mostrarAlerta();
            return;
        }

        this.fetchClima();
    }

    async fetchClima() {
        const { pais, ciudad } = this;
        const appId = '9e98f86b6c35e2b3a50d7cdcf47cac37';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        try {
            const response = await axios.get(url);
            const { name, main, weather } = response.data;

            const climaData = {
                name,
                main,
                weather
            };

            runInAction(() => {
                this.setResultado(climaData);

                const kelvin = 273.15;
                const actual = main.temp - kelvin;

                // Modifica los colores según temperatura
                if (actual < 15) {
                    this.setBgColor('rgb(105, 108, 149)');
                } else if (actual >= 15 && actual < 25) {
                    this.setBgColor('rgb(71, 149, 212)');
                } else {
                    this.setBgColor('rgb(178, 28, 61)');
                }
            });

            this.ocultarTeclado();
        } catch (error) {
            this.mostrarAlerta();
        }
    }
}

const sharedStateStore = new SharedStateStore();
export default sharedStateStore;
