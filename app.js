const geoCode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const yargs = require("yargs");
const hideBin = require("yargs/helpers").hideBin;
require("dotenv").config();

yargs(hideBin(process.argv))
  .command(
    "checkWeather",
    "Checking weather of choosen location",
    {
      location: {
        describe: "Input location",
        demandOption: true,
        type: "string",
      },
    },
    (argv) => {
      geoCode(argv.location, (err, { longitude, latitude } = {}) => {
        if (err) {
          return console.log(err);
        }

        forecast(latitude, longitude, (err, weatherData) => {
          if (err) {
            return console.log(err);
          }

          console.log(
            `Current location: ${weatherData.location.name}, the weather is ${weatherData.current.weather_descriptions[0]}, current temperature is ${weatherData.current.temperature} degree Celcius, there is a ${weatherData.current.precip}% chance of raining.`
          );
        });
      });
    }
  )
  .parse();
