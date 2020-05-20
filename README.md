# CLI-based Weather app

This app can be used to fetch the current local time and basic weather information of a city. You can query by city name or postcode.

## Usage
1. You are required to have npm v6+ and node.js v12+ installed
2. run `npm install` to install the dependencies
3. rename `.env.sample` file to `env`
4. Input the supplied API key into the `.env` file eg: `API_KEY=<SUPPLIED_API_KEY>`
5. To fetch weather info, run the command `npm start <COMMA SEPARATED CITY NAMES OR POSTCODE>` eg: `npm start city1 city2 postcode1`
