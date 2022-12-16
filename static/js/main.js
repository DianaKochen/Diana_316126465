import { citiesTaxInfo } from './Cities.js'

function goBack() {
  window.location = 'map.html';
}

async function loadMap() {
  const apiKey = 'AIzaSyAyk6v-3Lqx7qfcxUNpH6Cwflik_ktbwSo';
  const loader = new google.maps.plugins.loader.Loader({ apiKey });
  const googleLoader = await loader.load();
  const mapOptions = {
    center: {
      lat: 32.087371715198124,
      lng: 34.88346341137375,
    },
    zoom: 8,
  };
  const mapElement = document.getElementById('map');
  const { maps } = googleLoader;
  const map = new maps.Map(mapElement, mapOptions);
  for (const city of citiesTaxInfo) {
    const marker = new maps.Marker({
        position: city.coordinates,
        icon: getPrecentageIcon(city),
        map,
        animation: maps.Animation.DROP,
    });
    maps.event.addListener(marker, "click", () => onMarkerClick(city))
  }
}

function onMarkerClick(city) {
    window.location.href = `${window.location.origin}/static/views/Results.html?city=${city.name}`
}

function loadResults() {
  const cityName = new URL(window.location).searchParams.get("city");
  const cityTitle = document.getElementById('city-name');
  cityTitle.textContent = cityName.split("").reverse().join("");

  const city = citiesTaxInfo.find(c => c.name === cityName);
  const income = sessionStorage.getItem('income');
  const points = sessionStorage.getItem("points");
  
  if (income && points) {
    const TotalTaxReturnElem = document.getElementById("TotalTaxReturn");
    const MonthlyTaxElem = document.getElementById("MonthlyTax");

    if (points >= 0 && points <= 1.5) {
      MonthlyTaxElem.value = +(income * 0.085).toFixed(2);
    }
    else if (points > 1.5 && points <= 9) {
        MonthlyTaxElem.value = +(income * 0.05).toFixed(2);
    }
    else if (points > 9) {
        MonthlyTaxElem.value = +(income * 0.07).toFixed(2);
    }

    TotalTaxReturnElem.value = +((income * 12) * (city.percent / 100)).toFixed(2);
  }
  else {
    alert('יש לחזור לדף הקודם ולמלא גובה הכנסה');
  }
}

function getPrecentageIcon(city) {
  const A = "../images/green_MarkerA.png";
  const B = "../images/blue_MarkerB.png";
  const C = "../images/yellow_MarkerC.png";
  const D = "../images/orange_MarkerD.png";
  const E = "../images/red_MarkerE.png";

  if (city.percent <= 7) {
    return E;
  }
  else if (city.percent >= 4 && city.percent < 8) {
    return D;
  }
  else if (city.percent >= 8 && city.percent < 12) {
    return C;
  }
  else if (city.percent >= 12 && city.percent < 16) {
    return B;
  }
  else if (city.percent >= 16) {
    return A;
  }
}

function sendResultsMail() {
  var formattedBody = `החזר מס חודשי: ${document
      .getElementById("MonthlyTax")
      .value} \nהחזר מס שנתי: ${document
      .getElementById("TotalTaxReturn")
      .value}`;
  
  var mailToLink = "mailto:yourmail@gmail.com?Subject=חישוב החזר המס שלך&body=" + encodeURIComponent(formattedBody);
  window.location.href = mailToLink;
}

window.loadMap = loadMap;
window.goBack = goBack;
window.loadResults = loadResults;
window.sendResultsMail = sendResultsMail;