import View from "./Views";

class DisplayCitiesView extends View {
  _parentElement = document.getElementById("cities-weathers");
  _currentCountryElement = document.getElementById("selected-country");
  _citiesTabElement = document.getElementById("cities-tab");
  _grandparentElement = document.getElementById("cities-container");
  _bookMarkPageElement = document.getElementById("bookmarks-container");

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  updatePageHeader(country) {
    this._currentCountryElement.innerText = country ? country : "Bookmarks";
  }

  addHandlerTabChange(handler) {
    this._citiesTabElement.addEventListener("click", handler);
  }

  showCitiesWeathersPage() {
    this._grandparentElement.classList.remove("d-none");
    this._bookMarkPageElement.classList.add("d-none");
  }

  addHandlerBookmarks(handler) {
    this._parentElement.addEventListener("click", handler);
  }

  updateCityBookmarkElement(event) {
    const bookMarkStatus = event.srcElement.innerText === "bookmark_added";
    event.srcElement.innerText = bookMarkStatus ? "bookmark" : "bookmark_added";
  }

  showNoData() {
    this._parentElement.innerText = "Kindly select a country!";
  }

  _generateMarkup() {
    return this._data
      .map((cityWeather) => this._generateCityWeatherCardMarkup(cityWeather))
      .join("");
  }

  _generateCityWeatherCardMarkup(cityWeather) {
    if (cityWeather && Object.keys(cityWeather).length) {
      const {
        name,
        temperature,
        weather_icon,
        weather_descriptions,
        wind_speed,
        humidity,
        bookmarked,
      } = cityWeather;
      return `<div class="weather-card">
    <div class="weather-card-box-1">
      <span class="degree-value">${temperature}</span>
      <span class="material-symbols-outlined degree">
        fiber_manual_record
      </span>
    </div>
    <div class="weather-card-box-2">
      <div class="weather-image-container">
        <img
          src="${weather_icon[0]}"
        />
      </div>
    </div>
    <div class="weather-card-box-3">
      <div class="wind-speed-container">
        <span class="material-symbols-outlined"> airwave </span>
        <span>
          <span>${wind_speed}</span>
          <span>Km/hr</span>
        </span>
      </div>
      <div class="humidity-container">
        <span class="material-symbols-outlined">
          humidity_percentage
        </span>
        <span>
          <span>${humidity}</span>
        </span>
      </div>
      <button type="button">
        <span class="material-symbols-outlined" country-name = "${name}"> ${
        bookmarked ? "bookmark_added" : "bookmark"
      }</span>
      </button>
    </div>
    <div class="weather-card-box-4">
      <div class="city-detail-container">
        <a href="#">
          <span>${name}</span>
        </a>
      </div>
      <div class="weather-description">${weather_descriptions[0]}</div>
    </div>
  </div>`;
    }
  }
}

export default new DisplayCitiesView();
