import { cleanInput, fetchCityWeather, processWeatherPromises, processValidResponse } from '../api'

describe('clean user input', () => {
  it('should strip out special characters', () => {
    const input: Array<string> = ['!Lagos', 'london,', 'jos.', 'Berlin*', 'sao paulo;']
    const expectedOutput: Array<string> = ['Lagos', 'london', 'jos', 'Berlin', 'sao paulo']
    const output = cleanInput(input)

    expect(output).toEqual(expectedOutput)
  })
})

describe('fetch weather data', () => {
  it('should retrieve weather information for a city', () => {
    const city = "Berlin"
    const fetch = jest.fn(() => new Promise((resolve, reject) => {}))
    fetchCityWeather(city, fetch)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(city))
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(process.env.API_KEY))
  })
})

describe('process fetch promises', () => {
  it('should concurrently process the resolved promises', async () => {
    const resolvedPromise = new Promise((resolve, reject) => resolve('resolved'))
    const input = [resolvedPromise]
    const expectedOutput = ['resolved']
    const result = await processWeatherPromises(input)

    expect(result).toEqual(expectedOutput)
  })

  it('should concurrently process the rejected promises', async () => {
    const rejectedPromise = new Promise((resolve, reject) => reject('rejected'))
    const input = [rejectedPromise]
    const expectedOutput = 'rejected'
    const result = await processWeatherPromises(input)

    expect(result).toEqual(expectedOutput)
  })
})

describe('process returned weather data', () => {
  it("should capture 'city not found' error", () => {
    const response = {
      error: {
        code: 1006,
        message: 'No matching location found.'
      }
    }
    const output = processValidResponse(response)

    expect(output).toEqual(response.error.message)
  })

  it("should collectly format the response if no error", () => {
    const response = {
      location: {},
      current: {},
    }
    const output = processValidResponse(response)
    const outputProperties = Object.keys(output)

    expect(outputProperties).toEqual(['locationInfo', 'currentWeatherCondition'])
  })
})
