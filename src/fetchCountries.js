const fetchCountries = async name => {
    const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`);
    if (!response.ok) {
        return Promise.reject(new Error());
    }
    return await response.json();
};
export { fetchCountries };