import fetch from 'node-fetch'
import { cleanInput, fetchCityWeather, processWeatherPromises, processValidResponse } from '../src/api'

const commandLineArguments = process.argv
const userInputs: Array<string> = commandLineArguments.splice(2)

const cleanedInput: Array<string> = cleanInput(userInputs)
const cityWeatherPromises: Array<Promise<any>> = cleanedInput.map(city => fetchCityWeather(city, fetch))

processWeatherPromises(cityWeatherPromises)
  .then((promisedResponses: Array<Promise<any>>) => {
    const processedResponse = promisedResponses.map(response => processValidResponse(response))
    const formattedOutput = JSON.stringify(processedResponse, null, 3)
    console.log(formattedOutput)
  })
  .catch(error => console.log({ error }))
