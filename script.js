const form = document.getElementById('form'),
  search = document.getElementById('search'),
  result = document.getElementById('result'),
  more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

function searchSongs(term) {
  fetch(`${apiURL}/suggest/${term}`)
    .then(res => res.json())
    .then(data => console.log(data));

  showData(data);
}

// Event Listeners
form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if(!searchTerm) {
    alert('Type in a search term Yo')
  } else {
    searchSongs(searchTerm);
  };

});
