document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://api.openweathermap.org/data/3.0/onecall';
    const exclude = 'minutely,hourly,daily,alerts';
    const units = 'metric'; // Specify metric units
    const appid = 'e8b383ed7a8d1d161e64c72671cf0bc2';

    function searchWeather() {
        const latitude = document.getElementById('latitudeInput').value;
        const longitude = document.getElementById('longitudeInput').value;

        const url = `${apiUrl}?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=${units}&appid=${appid}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayTemperature(data.current.temp);
                displayFeelsLike(data.current.feels_like);
                displayPressure(data.current.pressure);
                displayHumidity(data.current.humidity);
                displayUVIndex(data.current.uvi);
                displayClouds(data.current.clouds);
                displayVisibility(data.current.visibility);
                displayWeather(data.current.weather[0].main);
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            });
    }

    function displayTemperature(temperature) {
        const temperatureElement = document.getElementById('temperature');
        temperatureElement.innerHTML = `<p>Temperature: ${temperature} °C</p>`; // Display in Celsius
    }

    function displayFeelsLike(feelsLike) {
        const feelsLikeElement = document.getElementById('feelsLike');
        feelsLikeElement.innerHTML = `<p>Feels Like: ${feelsLike} °C</p>`; // Display in Celsius
    }

    function displayPressure(pressure) {
        const pressureElement = document.getElementById('pressure');
        pressureElement.innerHTML = `<p>Pressure: ${pressure} hPa</p>`;
    }

    function displayHumidity(humidity) {
        const humidityElement = document.getElementById('humidity');
        humidityElement.innerHTML = `<p>Humidity: ${humidity} %</p>`;
    }

    function displayUVIndex(uvi) {
        const uviElement = document.getElementById('uvi');
        uviElement.innerHTML = `<p>UV Index: ${uvi}</p>`;
    }

    function displayClouds(clouds) {
        const cloudsElement = document.getElementById('clouds');
        cloudsElement.innerHTML = `<p>Clouds: ${clouds} %</p>`;
    }

    function displayVisibility(visibility) {
        const visibilityElement = document.getElementById('visibility');
        visibilityElement.innerHTML = `<p>Visibility: ${visibility} meters</p>`;
    }

    function displayWeather(weather) {
        const weatherElement = document.getElementById('weather');
        weatherElement.innerHTML = `<p>Weather: ${weather}</p>`;
    }

    // Call searchWeather function when the search button is clicked
    document.getElementById('searchButton').addEventListener('click', searchWeather);
});
