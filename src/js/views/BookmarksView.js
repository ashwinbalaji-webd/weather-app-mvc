import View from "./Views";

class BookmarksView extends View {
  _parentElement = document.getElementById("bookmarks-cities");
  _bookmarksTabElement = document.getElementById("bookmarks-tab");
  _grandparentElement = document.getElementById("bookmarks-container");
  _citiesPageElement = document.getElementById("cities-container");

  addHandlerRender(handler) {
    ["load"].forEach((ev) => window.addEventListener(ev, handler));
  }

  addHandlerTabChange(handler) {
    this._bookmarksTabElement.addEventListener("click", handler);
  }

  showCitiesWeathersPage() {
    this._grandparentElement.classList.remove("d-none");
    this._citiesPageElement.classList.add("d-none");
  }

  showNoData() {
    this._parentElement.innerText = "No bookmarks added!";
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

export default new BookmarksView();
