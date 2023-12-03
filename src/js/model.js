import { AJAX, formatCountryName } from "./helper";
import {
  GET_CITY_WEATHER_API_URL,
  GET_COUNTRIES_CITIES_API,
  POST_CITIES_OF_COUNTRY_API,
  CITIES,
  COUNTRIESANDCITIES,
  CITIES_WEATHERS,
  BOOKMARKED_CITIES_WEATHERS,
} from "./config";

export const state = {
  currentCountry: undefined,
  currentTab: "cities-tab",
  countriesAndCities: [],
  filteredCountries: [],
  citiesWeathers: [],
  bookmarkedCities: JSON.parse(localStorage.getItem("bookmarkedCities")) ?? [],
  bookmarkedCitiesWeathers: [],
  isBookmarkUpdated: true,
};

export const loadCountryList = async function () {
  // const countriesAndCities = await AJAX(GET_COUNTRIES_CITIES_API);
  // state.countriesAndCities = countriesAndCities.data;

  //Dummy
  state.countriesAndCities = COUNTRIESANDCITIES;
};

export const filterCountryList = async function (searchValue) {
  state.filteredCountries = state.countriesAndCities.filter((countryObj) =>
    countryObj.country.toLowerCase().includes(searchValue.toLowerCase())
  );
};

export const loadCityList = async function (country) {
  // const postData = { country };

  // const result = await AJAX(POST_CITIES_OF_COUNTRY_API, postData);
  // console.log(result);
  // state.cities = result.data;

  // DUMMY
  state.cities = CITIES;
};

export const loadCitiesWeathers = async function () {
  // state.citiesWeathers = await Promise.all(
  //   state.cities.map(async (city) => {
  //     const weatherDetail = await AJAX(GET_CITY_WEATHER_API_URL(city));
  //     console.log(weatherDetail);
  //     if (weatherDetail.success) {
  //       return {
  //         name: weatherDetail.location.name,
  //         temperature: weatherDetail.current.temperature,
  //         weather_icon: weatherDetail.current.weather_icons,
  //         weather_descriptions: weatherDetail.current.weather_descriptions,
  //         wind_speed: weatherDetail.current.wind_speed,
  //         humidity: weatherDetail.current.humidity,
  //         bookmarked: state.bookmarkedCities.includes(
  //           weatherDetail.location.name
  //         ),
  //       };
  //     }
  //   })
  // );

  // DUMMY
  state.citiesWeathers = CITIES_WEATHERS;
};

export const loadBookmarkedCitiesWeathers = async function () {
  if (state.bookmarkedCities.length) {
    // state.bookmarkedCitiesWeathers = await Promise.all(
    //   state.bookmarkedCities.map(async (city) => {
    //     const weatherDetail = await AJAX(GET_CITY_WEATHER_API_URL(city));
    //     return {
    //       name: weatherDetail.location.name,
    //       temperature: weatherDetail.current.temperature,
    //       weather_icon: weatherDetail.current.weather_icons,
    //       weather_descriptions: weatherDetail.current.weather_descriptions,
    //       wind_speed: weatherDetail.current.wind_speed,
    //       humidity: weatherDetail.current.humidity,
    //       bookmarked: true,
    //     };
    //   })
    // );

    state.isBookmarkUpdated = !1;
    // DUMMY
    state.bookmarkedCitiesWeathers = BOOKMARKED_CITIES_WEATHERS;
  }
};

export const updateCurrentTab = function (tab) {
  state.currentTab = tab;
};

export const loadCurrentCountry = function (country) {
  const formattedCountry = formatCountryName(country);
  localStorage.setItem("currentCountry", formattedCountry);
  state.currentCountry = formattedCountry;
};

export const addBookmarkCity = function (city) {
  if (state.bookmarkedCities.includes(city)) {
    const index = state.bookmarkedCities.indexOf(city);
    state.bookmarkedCities.splice(index, 1);
  } else {
    state.bookmarkedCities.push(city);
  }
  state.isBookmarkUpdated = !0;
  
  localStorage.setItem(
    "bookmarkedCities",
    JSON.stringify(state.bookmarkedCities)
  );
};
