export default async function openWeatherQuery(cityName: String, countryName: String) {
    // A global api call function.
    const api = 'a47dbbf97c6a91c4ca699a474c295f48';
    const openWeatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&units=metric&appid=${api}`;
    return fetch(openWeatherApi)
                  .then((res) => res.json())
                  .catch((err)=>{throw Error(err)})
        
}