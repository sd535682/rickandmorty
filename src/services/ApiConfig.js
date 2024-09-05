const BASE_URL = 'https://rickandmortyapi.com/api/character';

export default function fetchAllCharacters(page = 1, status = null) {
  let url = `${BASE_URL}?page=${page}`;
  if (status && status !== 'all') {
    url += `&status=${status}`;
  }
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
