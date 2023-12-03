import * as model from "./model";
import DisplayCitiesView from "./views/DisplayCitiesView";
import SelectCountryView from "./views/SelectCountryView";
import BookmarksView from "./views/BookmarksView";

const controlCountryList = async function () {
  try {
    SelectCountryView.renderSpinner();

    await model.loadCountryList();

    SelectCountryView.render(model.state.countriesAndCities);
  } catch (error) {
    console.log(`Error:${error.message}`);
    throw error;
  }
};

const controlCountrySearchList = async function (event) {
  try {
    const searchValue = event.target.value;

    SelectCountryView.renderSpinner();

    if (!model.state.countriesAndCities.length) await model.loadCountryList();

    model.filterCountryList(searchValue);

    SelectCountryView.render(model.state.filteredCountries);
  } catch (error) {
    console.log(`Error:${error.message}`);
    throw error;
  }
};

const controlCityListView = async function () {
  try {
    let country = window.location.hash.slice(1);

    if (!country) {
      country = localStorage.getItem("currentCountry");
    }

    if (country) {
      DisplayCitiesView.renderSpinner();

      model.loadCurrentCountry(country);

      await model.loadCityList(country);

      DisplayCitiesView.updatePageHeader(
        model.state.currentCountry
          ? model.state.currentCountry
          : "No country selected"
      );

      await model.loadCitiesWeathers();

      DisplayCitiesView.render(model.state.citiesWeathers);
    } else {
      DisplayCitiesView.showNoData();
    }
  } catch (error) {
    console.log(`Error:${error.message}`);
    throw error;
  }
};

const controlBookmarkCityListView = async function () {
  
  try {
    if (model.state.bookmarkedCities.length) {
      BookmarksView.renderSpinner();

      if (model.state.isBookmarkUpdated) {
        await model.loadBookmarkedCitiesWeathers();
      }

      BookmarksView.render(model.state.bookmarkedCitiesWeathers);
    } else {
      BookmarksView.showNoData();
    }
  } catch (error) {
    console.log(`Error:${error.message}`);
    throw error;
  }
};

const controlCityTabChange = function (event) {
  if (
    model.state.currentTab !== "cities-tab" &&
    event.target.id === "cities-tab"
  ) {

    DisplayCitiesView.showCitiesWeathersPage();

    model.updateCurrentTab(event.target.id);
  }
};

const controlBookmarkTabChange = function (event) {
  if (
    model.state.currentTab !== "bookmarks-tab" &&
    event.target.id === "bookmarks-tab"
  ) {

    BookmarksView.showCitiesWeathersPage();

    model.updateCurrentTab(event.target.id);
  }
};

const controlBookmarks = function (event) {
  const bookmarkCity = event.target.attributes["country-name"].value;

  if (!bookmarkCity) return;

  model.addBookmarkCity(bookmarkCity);

  DisplayCitiesView.updateCityBookmarkElement(event);
};

const init = function () {
  SelectCountryView.addHandlerRender(controlCountryList);
  SelectCountryView.addHandlerEventListener(controlCountrySearchList);
  DisplayCitiesView.addHandlerRender(controlCityListView);
  DisplayCitiesView.addHandlerTabChange(controlCityTabChange);
  BookmarksView.addHandlerRender(controlBookmarkCityListView);
  BookmarksView.addHandlerTabChange(controlBookmarkTabChange);
  DisplayCitiesView.addHandlerBookmarks(controlBookmarks);
};

init();
