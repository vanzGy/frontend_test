export default async function openWeatherQuery(cityName: String, countryName: String) {
    // A global api call function.
   
    const openWeatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&units=metric`;
    return fetch(openWeatherApi)
                  .then((res) => res.json())
                  .catch((err)=>{throw Error(err)})
        
}