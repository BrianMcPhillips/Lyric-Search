const form = document.getElementById('form'),
  search = document.getElementById('search'),
  result = document.getElementById('result'),
  more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

function searchSongs(term) {
  fetch(`${apiURL}/suggest/${term}`)
    .then(res => res.json())
    .then(data => showData(data));
}

function showData(data) {
  result.innerHTML = `
    <ul class="songs">
      ${data.data.map(song => `
        <li>
          <span><strong>${song.artist.name}</strong> - ${song.title}</span>
          <button 
            class="btn" 
            data-artist="${song.artist.name}"
            data-songtitle="${song.title}">Get Lyrics</button>
        </li>`)
      .join('')}
    </ul>
  `;

  if(data.prev || data.next) {
    more.innerHTML = `
      ${data.prev ? `<button class="btn" onClick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
      ${data.next ? `<button class="btn" onClick="getMoreSongs('${data.next}')">Next</button>` : ''}
    `;
  } else {
    more.innerHTML = '';
  }
}

function getMoreSongs(url) {
  fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    .then(res => res.json())
    .then(data => showData(data));
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
