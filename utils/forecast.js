const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const metric = "m";
  const url = `${process.env.WEATHER_BASE_URL}/current?access_key=${process.env.WEATHER_API_ACCESS_KEY}&query=${latitude},${longitude}&units=${metric}`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback(
        "Oops, something has gone wrong, please retry again later",
        undefined
      );
    } else if (body.error) {
      callback(`Error code: ${body.error.code}, ${body.error.info}`, undefined);
    } else {
      callback("", body);
    }
  });
};

module.exports = forecast;
