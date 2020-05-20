import { cleanInput, fetchCityWeather } from '../api'

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
    const API_KEY = "DUMMNY_TEST_API_KEY"
    const city = "Berlin"
    const fetch = jest.fn()
    fetchCityWeather(city, fetch)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(city))
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(API_KEY))
  })
})
