const dotenv = require('dotenv')

dotenv.config()

export const cleanInput = (input: Array<string>): Array<string> => {
  const cleanedInput = input.map(value => value.replace(/[!@#$%^&*.,`~%;:]/g, ""))
  
  return cleanedInput
}

export const fetchCityWeather = (city: string, fetchAPI: any) => {
  const weatherEndPoint = `http://api.weatherapi.com/v1/current.json?q=${city}&key=${process.env.API_KEY}`
  const fetchPromise = fetchAPI(weatherEndPoint)
    .then(response => response.json())
    .catch(err => err)
  
  return fetchPromise
}

export const processWeatherPromises = async (weatherPromises: Array<Promise<any>>) => {
  try {
    const resolved = await Promise.all(weatherPromises)
    
    return resolved
  } catch(rejected) {
    return rejected
  }
}
