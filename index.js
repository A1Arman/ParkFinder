'use strict';

// put your own value below!
const apiKey = 'uomDHu69DUbBj80Y6pK354WdvN4LLDIOSGLJmEst'; 
const searchURL = 'https://api.nps.gov/api/v1/parks';


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }
  
  function displayResults(responseJson) {

    $('.display-results').empty();
    for (let i = 0; i < responseJson.length; i++){
      $('.display-results').append(`
        <h3><a href="${responseJson[i].url}">${responseJson[i].fullName}</a></h3>
        <p>${responseJson[i].description}</p>
    `)};
    //display the results section  
    $('#results').removeClass('hidden');
  };
  
  function getStateParks(query, maxResults) {
    const params = {
      key: apiKey,
      stateCode: query,
      limit: maxResults - 1
    };
    let queryString = formatQueryParams(params)
    let url = searchURL + '?' + queryString;

    fetch(url)
      .then(response => response.json())
      .then(responseJson => displayResults(responseJson.data))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  };
  
  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      const maxResults = $('#js-max-results').val();
      getStateParks(searchTerm, maxResults);
    });
  }
  
  $(watchForm);