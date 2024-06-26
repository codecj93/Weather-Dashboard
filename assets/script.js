const searchButton = document.getElementById('searchbtn')
const APIKey = '2c4a84c3fda4a97e3e1fd95d4d7dd8d1'
const cityInput = document.getElementById('search-input');
const fiveDayDiv = document.getElementById('fiveday')
 

function fetchFiveDay(event) {
    event.preventDefault();
    const queryUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${APIKey}`;
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log('5 day');
            console.log(data)
            fiveDayDiv.innerHTML = ""
            createCard(data.list[0], false); // day 1
            createCard(data.list[9], false); // day 2
            createCard(data.list[17], false); // day 3
            createCard(data.list[25], false); // day 4
            createCard(data.list[33], false); // day 5
        });
        
}

function fetchCurrentDay(event) {
    event.preventDefault();
    addToHistory(cityInput.value)
    const queryUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${APIKey}`;
    fetch(queryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            
            console.log(data);
        
            createCard(data, true);
            fetchFiveDay(event);
            renderSearchHistory ()
        });

    
        
}


function createCard(data, shouldDisplayCityName) {
   const currentDayDiv = document.getElementById('currentday')
   

    const container = document.createElement("div");
    container.setAttribute('class', 'container');
    let header = '';

    if (shouldDisplayCityName) {
        header = document.createElement('h2');
        header.append(data.name);
    } else {
        // fiveDayDiv.setAttribute('class', 'fiveday');
        header = document.createElement('h2');
        header.append(data.dt_txt);

  
    }

    const temp = document.createElement('p');
    temp.innerText = `Temp: ${data.main.temp} F`;

    const wind = document.createElement('p');
    wind.innerText = `Wind: ${data.wind.speed} MPH`;

    const humidity = document.createElement('p');
    humidity.innerText = `Humidity: ${data.main.humidity} %`;

    const icon = document.createElement('img');
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    



    container.append(header);
    container.append(temp);
    container.append(wind);
    container.append(humidity);
    container.append(icon);
    var dataDiv=document.getElementById('data');
    
    console.log(fiveDayDiv);
    
if (shouldDisplayCityName) {
    currentDayDiv.innerHTML = ""
  currentDayDiv.append(container)  
} else {
    // fiveDayDiv.innerHTML = ""
    container.setAttribute('class', 'fiveday');
    fiveDayDiv.append(container); 
}
  

}


// const dayjs = data.dt.require('dayjs');

// function timeStamp(unixTimestamp) {
//     return dayjs.unix(unixTimestamp).format('YYYY-MM-DD');
// }

function addToHistory (cityName) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.unshift(cityName);
    const slicedHistory = history.slice(0,5)
    localStorage.setItem('history', JSON.stringify(slicedHistory));
}

// let lastSearchedCity = '';

// function searchCity(newcityInput)
//     if (lastSearchedCity !== '') {
//         const lastCityElement = 
        
//     }
function handleHistoryClick(event) {
cityInput.value = event.target.textContent
searchButton.click()
}

function renderSearchHistory () { 
 const searchHistoryData = JSON.parse(localStorage.getItem('history')) || [];
 const searchHistoryElement = document.getElementById('searchHistory')
 searchHistoryElement.innerHTML = ""
 searchHistoryData.forEach(item => {
    const button = document.createElement('button');
    button.textContent = item
    button.addEventListener('click', handleHistoryClick) 
    searchHistoryElement.appendChild(button);
});
}




searchButton.addEventListener('click', fetchCurrentDay) 

renderSearchHistory ()