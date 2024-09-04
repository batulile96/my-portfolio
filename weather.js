
function getWeather() {
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let location = document.getElementById("location");

    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "f146799a557e8ab658304c1b30cc3cfd";

    location.innerHTML = "Locating...";

    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let url = `${api}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let temp = data.main.temp;
                temperature.innerHTML = temp + "° C";
                location.innerHTML = `${data.name} (${latitude}°, ${longitude}°)`;
                description.innerHTML = data.weather[0].main;

                // Call the geocoding function after getting the weather
                reverseGeocode(latitude, longitude);
            });
    }

    function error() {
        location.innerHTML = "Unable to retrieve your location";
    }
}

function reverseGeocode(latitude, longitude) {
    let apiKey = 'a98c811ec7364272a7fc47bfeff54b01';
    let query = `${latitude},${longitude}`;
    let apiUrl = 'https://api.opencagedata.com/geocode/v1/json';
    let requestUrl = `${apiUrl}?key=${apiKey}&q=${encodeURIComponent(query)}&pretty=1&no_annotations=1`;

    let request = new XMLHttpRequest();
    request.open('GET', requestUrl, true);

    request.onload = function() {
        if (request.status === 200) {
            let data = JSON.parse(request.responseText);
            console.log(data.results[0].formatted); // Log the location
        } else if (request.status <= 500) {
            console.log("Unable to geocode! Response code: " + request.status);
            let data = JSON.parse(request.responseText);
            console.log('Error msg: ' + data.status.message);
        } else {
            console.log("Server error");
        }
    };

    request.onerror = function() {
        console.log("Unable to connect to server");
    };

    request.send();  // Make the request
}

getWeather();

// Toggle menu on click
document.querySelector('.menu-icon').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('menu-active');
});
