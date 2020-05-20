export interface ValidResponseData {
  locationInfo: {
    city: string,
    country: string,
    localTime: string,
    longitude: number,
    latitude: number,
  },
  currentWeatherCondition: {
    lastUpdatedAt: string,
    condition: string,
    temperature: {
      celcius: number,
      farenheit: number,
    },
    wind: {
      spendInMPH: number,
      spendInKPH: number,
      angleInDegree: number,
      direction: string,
    },
    humidity: number
  }
}
