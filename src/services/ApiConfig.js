const BASE_URL = 'https://rickandmortyapi.com/api/character';

export default function fetchAllCharacters(page = 1) {
  const url = `${BASE_URL}?page=${page}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}
