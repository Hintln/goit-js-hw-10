const fetchCountries = name => {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(
    response => {
            if (!response.ok) {
                return Promise.reject(new Error());
            }
            return response.json();
        }
    )
};

export { fetchCountries };