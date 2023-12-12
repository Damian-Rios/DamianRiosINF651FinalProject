// Selecting elements from the DOM
const container = document.querySelector('.container'); // The main container of the webpage
const search = document.querySelector('.search-box button'); // The search button in the search box
const weatherBox = document.querySelector('.weather-box'); // The container for displaying weather information
const weatherDetails = document.querySelector('.weather-details'); // The container for additional weather details
const error404 = document.querySelector('.not-found'); // The container for displaying a 404 error message

// Adding an event listener to the search button
search.addEventListener('click', () => {

    // OpenWeatherMap API Key and city input
    const APIKey = '39a7a3c2a32fdc3d79d6f77f8a1b0026'; // Your OpenWeatherMap API Key
    const city = document.querySelector('.search-box input').value; // The city entered by the user in the search input field

    // If the city input is empty, return
    if (city === '') {
        return;
    }

    // Fetching weather data from the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            // Handling the case where the city is not found (Error 404)
            if (json.cod === '404') {
                // Adjusting UI elements to display an error message
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn'); // Adding a fade-in effect to the error message
                return;
            }

            // Resetting error display if the search is successful
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            // Selecting elements to display weather information
            const image = document.querySelector('.weather-box img'); // The weather icon
            const temperature = document.querySelector('.weather-box .temperature'); // The temperature display
            const description = document.querySelector('.weather-box .description'); // The weather description
            const humidity = document.querySelector('.weather-details .humidity span'); // The humidity display
            const wind = document.querySelector('.weather-details .wind span'); // The wind speed display

            // Updating the weather icon based on weather conditions
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png'; // Display a clear weather icon
                    break;

                case 'Snow':
                    image.src = 'images/snowy.png'; // Display a snowy weather icon
                    break;
                
                case 'Clouds':
                    image.src = 'images/cloudy.png'; // Display a cloudy weather icon
                    break;

                case 'Rain':
                    image.src = 'images/rainy.png'; // Display a rainy weather icon
                    break;

                case 'Storm':
                    image.src = 'images/stormy.png'; // Display a stormy weather icon
                    break;

                default:
                    image.src = ''; // If the weather condition is not recognized, do not display an icon
            }

            // Displaying temperature, description, humidity, and wind speed
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`; // Display the temperature in Fahrenheit
            description.innerHTML = `${json.weather[0].description}`; // Display the weather description
            humidity.innerHTML = `${json.main.humidity}%`; // Display the humidity percentage
            wind.innerHTML = `${parseInt(json.wind.speed)}mph`; // Display the wind speed in miles per hour

            // Displaying weather information with fade-in effect
            weatherBox.style.display = ''; // Display the weather information container
            weatherDetails.style.display = ''; // Display the additional weather details container
            weatherBox.classList.add('fadeIn'); // Adding a fade-in effect to the weather information
            weatherDetails.classList.add('fadeIn'); // Adding a fade-in effect to the additional weather details
            container.style.height = '590px'; // Adjusting the height of the main container for better visibility

        });
});
