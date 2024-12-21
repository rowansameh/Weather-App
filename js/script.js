// ~API link
// http://api.weatherapi.com/v1/forecast.json?key=<YOUR_API_KEY>&q=07112&days=7
// API :https://api.weatherapi.com/v1/forecast.json?q=cairo&days=3&key=c620cde02c3849cc92014651242112%20

const findLocation = document.querySelector("#findLocation");

findLocation.addEventListener("input", function (e) {
    console.log(e.target.value);
    getDataApi(e.target.value);
});

//get data
async function getDataApi(cityName) {
    if (cityName && cityName.length > 2) {
        let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=c620cde02c3849cc92014651242112`);

        if (!res.ok) return console.log("Failed to fetch data from WeatherAPI");

        let data = await res.json();
        console.log(data); // Display the fetched data
        displayData(data);
    } else {
        console.log("Invalid city name");
    }
}
getDataApi();

// ~Display data to user
function displayData(data) {

    // ~1.current data       -----in API----current => last_updated
    let dateToday = new Date(data.current.last_updated);
    console.log(dateToday.getDate());

    // ~display date and day
    document.querySelector(".day").innerHTML = dateToday.toLocaleString("en-us", { weekday: "long" });
    document.querySelector(".date").innerHTML = dateToday.getDate() + " " + dateToday.toLocaleString("en-us", { month: "long" });

    document.querySelector("#location").innerHTML = data.location.name;
    document.querySelector("#todayTemp").innerHTML = data.current.temp_c;
    // !important => setAttribute
    document.querySelector("#todayIcon").setAttribute("src", `https:${data.current.condition.icon}`);
    document.querySelector("#todayCondition").innerHTML = data.current.condition.text;
    document.querySelector("#humidity").innerHTML = data.current.humidity + "%";
    document.querySelector("#wind-speed").innerHTML = data.current.wind_kph + "km/h";
    document.querySelector("#wind-dir").innerHTML = data.current.wind_dir;

    // ~2.following days
    // ~will start from the next day => [1], and I need to show only 1,2 (next 2 days)
    let cartona = "";
    for (let i = 1; i <= 2; i++) {
        let dateNext = new Date(data.forecast.forecastday[i].date);
        console.log(dateNext);
        cartona = `<div class="forecast-card ${i == 1 ? "bg-custom-two" : "bg-custom"} text-white text-center h-100">
                <div class="${i == 1 ? "forecast-header2" : "forecast-header1"} py-2 px-4">
                <div class="day">${dateNext.toLocaleString("en-us", {weekday: "long",})}</div>
                </div>
                <div class="forecast-info p-4">
                <img class="fs-4" src="https:${data.forecast.forecastday[i].day.condition.icon}" alt="weather logo" width="90">

                <div class="fs-4 fw-bold">${data.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>C</div>
                <div><small>${data.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>C</small></div>

                <div class="text-primary">${data.forecast.forecastday[i].day.condition.text}</div></div>
                </div>`;
        
                // to add the 2 cards at the same time
               //                                       1-1 , 2-1 
                document.querySelectorAll(".card-days")[i - 1].innerHTML = cartona;
    }
}
console.log(document.querySelectorAll('.card-days'));

// ~geolocation
// !
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(pos){
        console.log(pos)
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        getDataApi(`${lat},${lon}`)
    })
}
// !---?????????????
const links = document.querySelectorAll('.nav-link');
console.log(links)

for(let i = 0;i<links.length;i++){
  links[i].addEventListener('click',function(e){
    e.preventDefault()
    links.forEach(function(link){
      link.classList.remove('active')
    })
    links[i].classList.add('active');

  })
}
