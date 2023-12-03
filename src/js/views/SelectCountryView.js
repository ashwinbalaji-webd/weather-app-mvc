import View from "./Views";

class SelectCountryView extends View {
  _parentElement = document.getElementById("select-country-container");
  _searchInputElement = document.getElementById("city-search-input");

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerEventListener(handler) {
    this._searchInputElement.addEventListener("input", handler);
    this._searchInputElement.addEventListener(
      "click",
      this.showParentElement.bind(this)
    );
    document.addEventListener("click", this.hideParentElement.bind(this));
  }

  showParentElement() {
    this._parentElement.classList.remove("d-none");
  }

  hideParentElement(event) {
    if (!this._searchInputElement.contains(event.target)) {
      this._parentElement.classList.add("d-none");
    }
  }

  _generateMarkup() {
    return this._data
      .map((countryObj) => this.generateCountryLinkMarkup(countryObj.country))
      .join("");
  }

  generateCountryLinkMarkup(country) {
    return `<a href="#${country}">${country}</a>`;
  }
}

export default new SelectCountryView();
