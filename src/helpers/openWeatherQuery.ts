export default async function openWeatherQuery(cityName: String, countryName: String) {
    // A global api call function.
   
    return fetch('test')
                  .then((res) => res.json())
                  .catch((err)=>{throw Error(err)})
        
}