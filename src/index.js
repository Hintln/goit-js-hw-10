import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';


const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const list = document.getElementById('country-list');
const info = document.getAnimations('country-info');

input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));
