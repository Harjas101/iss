// index.js
const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  return ip;
});

fetchCoordsByIP("173.176.17.179", (error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error);
    return coordinates;
  }

  console.log("It worked! Returned coordinates:", coordinates);
});

fetchISSFlyOverTimes(
  { latitude: "49.27670", longitude: "-123.13000" },
  (error, response) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }

    console.log("It worked! Returned risetime:", response);
  }
);

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log("iss times", passTimes);
});
