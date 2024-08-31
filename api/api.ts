type FetcherArgs = [string, string];

 export const fetcher = ([url, method]: FetcherArgs) =>
  fetch(url, {
    method,
    headers: {
      'x-rapidapi-key': 'febeb85c22msh1218452a7c2f30bp167c69jsn7043c0f7ca23',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  }).then((res) => res.json());
