const request = require("request");
const fetchMyIP = function (callback) {
  request(
    `https://api.ipify.org/?format=json`,
    function (error, response, body) {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }
      callback(null, body);
    }
  );
};

const fetchCoordsByIP = function (ip, callback) {
  console.log("ip test", ip);
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    const ip = "173.176.17.179";
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`
        ),
        null
      );
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
    //console.log(callback)
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  const { longitude, latitude } = coords;
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`,
    function (error, response, body) {
      if (error) {
        callback(error, null);
        return;
      } else {
        callback(null, JSON.parse(body).response);
      }
    }
  );
};

//fetchCoordsByIP("173.176.17.179",)

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
   // console.log("super test", ip);
    fetchCoordsByIP(JSON.parse(ip).ip, (error, coordinates) => {
      //console.log("super test 2", coordinates);
      fetchISSFlyOverTimes({
        longitude: coordinates.longitude,
        latitude: coordinates.latitude,
      },(error,response) =>{
       
      callback(error, response)
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
