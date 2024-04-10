const searchButton = document.getElementById('searchbtn')
const APIKey = '2c4a84c3fda4a97e3e1fd95d4d7dd8d1'


function fetchFiveDay(event) {
    event.preventDefault();
    let city = document.getElementById('search-input').value
    const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('5 day');
            console.log(data);
            createCard(data.list[0], false); // day 1
            createCard(data.list[9], false); // day 2
            createCard(data.list[17], false); // day 3
            createCard(data.list[25], false); // day 4
            createCard(data.list[33], false); // day 5
        });
}

function fetchCurrentDay(event) {
    event.preventDefault();
    let city = document.getElementById('search-input').value
    const queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('Github Repo Issues \n----------');
            console.log(data);
            createCard(data, true);
            fetchFiveDay(event);
        });
}


function createCard(data, shouldDisplayCityName) {
    const container = document.createElement("div");
    let header = '';

    if (shouldDisplayCityName) {
        header = document.createElement('h2');
        header.append(data.name);
    } else {
        header = document.createElement('h2');
        header.append(data.dt);
    }

    const temp = document.createElement('p');
    // temp.setAttribute('class', 'temp');
    temp.innerText = `Temp: ${data.main.temp}`;

    const wind = document.createElement('p');
    wind.innerText = `Wind: ${data.wind.speed} MPH`;

    const humidity = document.createElement('p');
    humidity.innerText = `Humidity: ${data.main.humidity} %`;



    container.append(header);
    container.append(temp);
    container.append(wind);
    container.append(humidity);
    document.getElementById('data').append(container);
}




searchButton.addEventListener('click', fetchCurrentDay);