import { config } from "./config.js";

let infoCity;

// Fonction pour récupérer les données météo depuis l'API
async function getWeatherData(city) {
  try {
    const TOKEN = config.TOKEN;
    
    // Utilisation de fetch pour effectuer la requête à l'API
    let response = await fetch(`https://api.meteo-concept.com/api/forecast/nextHours?token=${TOKEN}&insee=${city.insee}`).catch(error => console.log('error', error));

    // Vérification si la requête a réussi
    if (response.ok) {
      // Conversion de la réponse en JSON
      const data = await response.json();

      // Appel de la fonction pour afficher les données dans l'interface
      displayWeatherData(data);
    } else {
      console.error("Erreur lors de la récupération des données météo.");
    }
  } catch (error) {
    console.error("Erreur:", error);
  }
}

// Fonction pour afficher les données météo dans l'interface
async function displayWeatherData(data) {
  // Récupération des éléments HTML où afficher les données
  const cityNameElement = document.getElementById("cityName");
  const temperatureElement = document.getElementById("temperature");
  const weatherDescriptionElement = document.getElementById("weatherDescription");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");

  // Affichage des données dans l'interface
  cityNameElement.textContent = data.city.name;
  temperatureElement.textContent = `${data.forecast[0].temp2m} °C`;
  weatherDescriptionElement.textContent = `Le temps est ${config.WEATHER[data.forecast[0].weather]}`;
  humidity.textContent = `Humidité: ${data.forecast[0].rh2m} %`;
  wind.textContent = `Vent: ${data.forecast[0].wind10m} km/h`;
}

// Appel à la fonction toutes les heures
fetch('./conf.json')
  .then(response => response.json())
  .then(data => {
    infoCity = data;
    // Appel de la fonction avec la ville spécifique entrée dans le conf.json
    getWeatherData(infoCity);
  })
  .catch(error => {
    console.error('Erreur lors du chargement du fichier JSON:', error);
  });
setInterval(() => {
  fetch('./conf.json')
    .then(response => response.json())
    .then(data => {
      infoCity = data;
      // Appel de la fonction avec la ville spécifique entrée dans le conf.json
      getWeatherData(infoCity);
    })
    .catch(error => {
      console.error('Erreur lors du chargement du fichier JSON:', error);
    });
}, 3600000);
