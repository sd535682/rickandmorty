const BASE_URL = 'https://rickandmortyapi.com/api/character';

export default function fetchAllCharacters() {
  let url = `${BASE_URL}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data.results)
    .catch(error => {
      console.error('Error fetching data :', error);
      return [];
    });
}

export const fetchCharacterDetails = id => {
  return fetch(`${BASE_URL}/character/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error fetching character details:', error);
      return null;
    });
};
