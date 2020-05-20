export const cleanInput = (input: Array<string>): Array<string> => {
  const cleanedInput = input.map(value => value.replace(/[!@#$%^&*.,`~%;:]/g, ""))
  
  return cleanedInput
}

export const fetchCityWeather = (city, fetchAPI) => {}
