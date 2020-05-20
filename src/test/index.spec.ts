import { emptyInput, cleanInput, fetchCityWeather, processPromises, processValidResponse } from '../api'

describe('check for empty input', () => {
  it('should return false for empty input', () => {
    const input: Array<string> = []
    const expectedOutput: boolean = true
    const output = emptyInput(input)

    expect(output).toEqual(expectedOutput)
  })

  it('should return true for non-empty input', () => {
    const input: Array<string> = ['berlin']
    const expectedOutput: boolean = false
    const output = emptyInput(input)

    expect(output).toEqual(expectedOutput)
  })
})

describe('clean user input', () => {
  it('should strip out special characters', () => {
    const input: Array<string> = ['!Lagos', 'london,', 'jos.', 'Berlin*', 'sao paulo;', '10010']
    const expectedOutput: Array<string> = ['Lagos', 'london', 'jos', 'Berlin', 'sao paulo', '10010']
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
    const result = await processPromises(input)

    expect(result).toEqual(expectedOutput)
  })

  it('should concurrently process the rejected promises', async () => {
    const rejectedPromise = new Promise((resolve, reject) => reject('rejected'))
    const input = [rejectedPromise]
    const expectedOutput = 'rejected'
    const result = await processPromises(input)

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
      location: {
        name: "Berlin",
        country: "Germany",
        localtime: "2020-05-20 13:19",
        lon: 13.4,
        lat: 52.52
      },
      current: {
        last_updated: "2020-05-20 04:15",
        temp_c: 11.1,
        temp_f: 52,
        condition: {
          text: "Clear"
        },
        wind_mph: 0,
        wind_kph: 0,
        wind_degree: 67,
        wind_dir: "NNW",
        humidity: 54,
      }
    }
    const output = processValidResponse(response)
    const outputProperties = Object.keys(output)

    expect(outputProperties).toEqual(['locationInfo', 'currentWeatherCondition'])
  })
})
