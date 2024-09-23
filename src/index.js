import './style.css';
import 'iconify-icon';
import logo from './assets/logo.png';
const myLogo = document.querySelector('.logo img');
myLogo.src = logo;

const apiKey = 'YVVLSZW6DTVFAC3VEABQEW7DK';
const weatherData = document.querySelector('#weatherData');

async function getWeather(location) {
    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${apiKey}&contentType=json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return displayWeather(data);
    } catch (error) {
        console.log(error);
    }
}

const displayWeather = (data) => {
    weatherData.innerHTML = `
        <div class="card current">
            <div class="temperature-container">
                <div class="location">
                    <p>${data.resolvedAddress}</p>
                </div>
                <div class="temperature">
                    <p>${data.currentConditions.temp} ºC</p>
                    <div class="weather-icon">
                    <iconify-icon icon="material-symbols:${data.currentConditions.icon}"></iconify-icon>
                </div>
                </div>
                <div class="min-max">
                    <p>Min. ${data.days[0].tempmin} ºC / Max. ${data.days[0].tempmax} ºC</p>
                </div>
            </div>
            <div class="details-container">
                <div class="description">
                    <p>${data.currentConditions.conditions}</p>
                </div>
                <div class="feels-like">
                    <p>Feels like: ${data.currentConditions.feelslike} ºC</p>
                </div>
            </div>
        </div>
    `;
};

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.querySelector('#location').value;
    getWeather(location);
});
