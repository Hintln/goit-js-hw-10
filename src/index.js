
import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';


const DEBOUNCE_DELAY = 300;


const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};


refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    const inputValue = e.target.value.trim();
    if (!inputValue) {
        clearCountryList();
        cleraCountryInfo();
        return;
    }

    fetchCountries(inputValue)
        .then(data => {
            if (data.length > 10) {
                Notify.info(
                    `Too many matches found. Please enter a more specific name.`
                );
                clearCountryList();
                cleraCountryInfo();
                return;
            }
            if (data.length === 1) {
                refs.countryInfo.innerHTML = createMarkupCountryInfo(data);
                clearCountryList();
                return;
            }
            if (data.length >= 2 || data.length < 10) {
                refs.countryList.innerHTML = createMarkupCountryList(data);
                cleraCountryInfo;
                return;
            }
        })
        .catch(error => {
            Notify.failure(`Oops, there is no country with that name.`);
            clearCountryList();
            cleraCountryInfo();
        });
}
 
function createMarkupCountryInfo(arr) {
    return arr
        .map(
          ({ name, flags, languages, population, capital }) =>
        `   
    <div class="js-card">
    <div class="js-card-top">
      <img class="js-card-img" src="${flags.svg}" alt="${name.official}" />
      <h2 class="js-card-title">${name.common}</h2>
    </div>
    <div class="js-card-info">
      <p class="js-card-text"><span class="js-card-span">Capital:</span> ${capital}</p>
      <p class="js-card-text"><span class="js-card-span">Population:</span> ${population}</p>
      <p class="js-card-text"><span class="js-card-span">Languages:</span> ${Object.values(languages)}
      </p>
    </div>
    </div>`
    )
    .join('');
}

function createMarkupCountryList(arr) {
    return arr
        .map(
            ({
                name, flags
            }) =>
                `<li class"country-list_item">
                <img class="js-item_img" src="${flags.svg}" alt"${name.official}">
                <h2 class="js-title">${name.common}</h2>
                </li>`
        )
        .join('');
}

function clearCountryList() {
    refs.countryList.innerHTML = '';
}

function cleraCountryInfo() {
    refs.countryInfo.innerHTML = '';
}