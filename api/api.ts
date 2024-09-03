type FetcherArgs = [string, string];

 export const fetcher = ([url, method]: FetcherArgs) =>
  fetch(url, {
    method,
    headers: {
      'x-rapidapi-key': '82c21417dbmshaf017f8af19ccabp1aaab3jsnae4a74536536',
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  }).then((res) => res.json());
