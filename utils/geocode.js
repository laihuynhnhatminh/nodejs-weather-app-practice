const request = require("postman-request");

const geoCode = (address, callback) => {
  const url = `${
    process.env.GEOCODING_BASE_URL
  }/mapbox.places/${encodeURIComponent(address)}.json?access_token=${
    process.env.GEOCODING_API_ACCESS_KEY
  }&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services!!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback("", {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
