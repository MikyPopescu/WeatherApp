window.addEventListener("load", () => {
  let long;
  let lat;
  const temperatureSpan = document.querySelector(".temperature span");
  let temperatureSection = document.querySelector(".temperature");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    //this works only if you allow location
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/4b728e37c3b1f5c724a2202f02bb0909/37.8267,-122.4233/${lat},${long}`;

      fetch(api)
        .then(response => {
          //conversion into JSON
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently();
          //set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.locationTimezone;

          //Celsius conversion
          let celsius = (temperature - 32) * (5 / 9);
          //set icon
          setIcons(icon, document.querySelector(".icon"));

          //change temperature celsius/farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpanSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpanSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });

    function setIcons(icon, iconId) {
      const skycons = new Skycons({ color: "white" });
      const currentIcon = icon.replace(/-/g, "_").toUpperCase(); //looks for every "-" and replaces it with "_"
      skycons.play();
      return skycons.set(iconId, Skycons[currentIcon]);
    }
  } else {
    h1.textContent = "Please enable your location";
  }
});
