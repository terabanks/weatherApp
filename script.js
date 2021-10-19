let weather = {
    apiKey: "12ad81b82748b12e72b10787bbf0bd71",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=imperial&appid="
            + this.apiKey)
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) { //Function to pull data from openweather.org
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { sunrise, sunset } = data.sys;

        //Allows background-image to match images from searched 'city'
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"

        //Query Selectors
        document.querySelector('.city').innerText = name + "'s Weather: ";
        document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = temp + "°F";
        document.querySelector('.humidity').innerText = "Humidity: " + humidity + "%";
        document.querySelector('.wind-speed').innerText = "Wind Speed: " + speed + " mph";

        //Convert sunrise (Unix timestamp) to time
        function sunriseTime() {
            let dt = new Date(sunrise * 1000)
            let h = dt.getHours()
            let m = "0" + dt.getMinutes()
            let sunriseTime = h + ":" + m.substr(-2)
            return sunriseTime;
        }
        document.querySelector('.sunrise').innerText = "Sunrise: " + sunriseTime() + "AM";

        //Convert sunset (Unix timestamp) to time
        function sunsetTime() {
            let dt = new Date(sunset * 1000)
            let h = dt.getHours()
            let m = "0" + dt.getMinutes()
            let sunsetTime = h + ":" + m.substr(-2)
            return sunsetTime;
        }
        document.querySelector('.sunset').innerText = "Sunset: " + sunsetTime() + "PM";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-field").value);
    }
};

const searchInput = document.querySelector(".search-field");

document.querySelector(".search-btn").addEventListener("click", function () {
    weather.search();
    searchInput.value = ""; //Reset search-field after clicking search icon
});

//Allows user to use "enter" key instead of clicking on search icon
document.querySelector(".search-field").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
        searchInput.value = ""; //Reset search-field after pressing Enter
    }
})

