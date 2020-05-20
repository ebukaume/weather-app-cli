const dotenv = require('dotenv')
import { FetchError } from 'node-fetch'
import { ValidResponseData } from '../types/d'

dotenv.config()

export const emptyInput = (userInput: Array<string>): boolean => {
  if(userInput.length > 0) {
    return false
  }

  return true
}

export const cleanInput = (input: Array<string>): Array<string> => {
  const cleanedInput = input.map(value => value.replace(/[!@#$%^&*.,`~%;:]/g, ""))
  
  return cleanedInput
}

export const fetchCityWeather = (city: string, fetchAPI: any): Promise<Response> => {
  const weatherEndPoint = `http://api.weatherapi.com/v1/current.json?q=${city}&key=${process.env.API_KEY}`
  const fetchPromise = fetchAPI(weatherEndPoint)
    .then(response => response.json())
    .catch(err => err)
  
  return fetchPromise
}

export const processPromises = async (promises: Array<Promise<any>>): Promise<Array<any>> => {
  try {
    const resolved = await Promise.all(promises)
    
    return resolved
  } catch(rejected) {
    return rejected
  }
}


export const processValidResponse = (response: any): string | ValidResponseData => {
  if(response instanceof FetchError) {
    return response.message
  }
  const { error, location, current } = response

  if(error) {
    return error.message
  }

  return {
    locationInfo: {
      city: location.name,
      country: location.country,
      localTime: location.localtime,
      longitude: location.lon,
      latitude: location.lat,
    },
    currentWeatherCondition: {
      lastUpdatedAt: current.last_updated,
      condition: current.condition.text,
      temperature: {
        celcius: current.temp_c,
        farenheit: current.temp_f,
      },
      wind: {
        spendInMPH: current.wind_mph,
        spendInKPH: current.wind_kph,
        angleInDegree: current.wind_degree,
        direction: current.wind_dir
      },
      humidity: current.humidity
    }
  }
}
