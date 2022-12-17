export function convertKelvinToCelcius(temp) {
    return (Math.round(temp - 273.15));
}

export function convertKelvinToFahrenheit(temp) {
    return (Math.round(((temp - 273.15) * 1.8) + 32));
}

export function capitaliseWords(string) {
    let words = string.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    words = words.join(" ");

    return words;
}

export function convertCelciusToFahrenheit(c) {
    let celcius = Number(c);
    
    return (Math.round(celcius * 1.8 + 32));
}

export function convertFahrenheitToCelcius(f) {
    let fahrenheit = Number(f);    
    return (Math.round((fahrenheit - 32) * 0.5556));
}

export function mpsToMph(windSpeed) {
    return ((windSpeed * 2.23694).toPrecision(2));
}

export function mphToKph(mph) {
    return ((mph * 1.60934).toPrecision(2));
}

export function kphToMph(kph) {
    return ((kph / 1.609366).toPrecision(2));
}