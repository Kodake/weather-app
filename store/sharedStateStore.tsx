import { makeAutoObservable } from 'mobx';
import { Alert, Animated, Keyboard } from 'react-native';
import { Resultado } from '../interfaces/appInterfaces';
import { ALERT_MESSAGES } from '../messages/appMessages';

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
        Alert.alert(ALERT_MESSAGES.noResults);
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

    setResultado(resultado: Resultado | null) {
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

    async consultarClima() {
        if (this.pais.trim() === '' || this.ciudad.trim() === '') {
            this.mostrarAlerta();
            return;
        }

        this.setConsultar(true);
        if (this.consultar) {
            const appId = `9e98f86b6c35e2b3a50d7cdcf47cac37`;
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.ciudad},${this.pais}&appid=${appId}`;

            try {
                const respuesta = await fetch(url);
                const data = await respuesta.json();
                const { name, main, weather } = data;

                const climaData: Resultado = {
                    name,
                    main,
                    weather,
                };

                this.setResultado(climaData);
                this.setConsultar(false);

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
                this.ocultarTeclado();
            } catch (error) {
                this.mostrarAlerta();
            }
        }
    }
}

const sharedStateStore = new SharedStateStore();
export default sharedStateStore;
