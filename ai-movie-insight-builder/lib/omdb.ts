export async function fetchMovie(imdbId: string) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${imdbId}&plot=short`
  );

  const data = await res.json();

  if (data.Response === "False") {
    throw new Error("Movie not found");
  }

  return data;
}
