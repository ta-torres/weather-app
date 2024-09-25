import './style.css';
import 'iconify-icon';
import logo from './assets/logo.png';
const myLogo = document.querySelector('.logo img');
myLogo.src = logo;

const apiKey = 'YVVLSZW6DTVFAC3VEABQEW7DK';
const weatherData = document.querySelector('#weatherData');
const errorMessage = document.querySelector('.error-message');

async function getWeather(location, unit = 'metric') {
    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=${apiKey}&contentType=json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const data = processWeather(await response.json());
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const processWeather = (data) => {
    let { resolvedAddress, currentConditions, days } = data;
    return {
        currentConditions,
        days,
        resolvedAddress,
    };
};

const displayWeather = (data, unit) => {
    const tempUnit = unit === 'metric' ? '°C' : '°F';
    weatherData.innerHTML = `
        <div class="card current">
            <div class="temperature-container">
                <div class="location">
                    <p>${data.resolvedAddress}</p>
                </div>
                <div class="temperature">
                    <p>${data.currentConditions.temp} ${tempUnit}</p>
                    <div class="weather-icon">
                    <iconify-icon icon="material-symbols:${data.currentConditions.icon}"></iconify-icon>
                </div>
                </div>
                <div class="min-max">
                    <p>Min. ${data.days[0].tempmin} ${tempUnit} / Max. ${data.days[0].tempmax} ${tempUnit}</p>
                </div>
            </div>
            <div class="details-container">
                <div class="description">
                    <p>${data.currentConditions.conditions}</p>
                </div>
                <div class="feels-like">
                    <p>Feels like: ${data.currentConditions.feelslike} ${tempUnit}</p>
                </div>
            </div>
        </div>
    `;
};

const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMessage.textContent = '';
    const location = document.querySelector('#location').value;
    if (!location) return;
    const unit = document.querySelector('input[name="unit"]:checked').value;

    const weatherData = await getWeather(location, unit);
    if (weatherData) {
        displayWeather(weatherData, unit);
    } else {
        errorMessage.textContent = 'City not found';
    }
    form.reset();
});
