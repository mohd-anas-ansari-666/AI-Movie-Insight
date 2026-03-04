import SentimentBadge from "./SentimentBadge";

export default function MovieCard({ data }: any) {
  const { movie, aiSummary, sentiment } = data;

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
      <div className="flex gap-6">
        <img src={movie.Poster} alt={movie.Title} className="w-40 rounded" />

        <div>
          <h2 className="text-2xl font-bold">{movie.Title}</h2>
          <p>{movie.Year}</p>
          <p>Rating: {movie.imdbRating}</p>
          <p className="mt-2">{movie.Plot}</p>

          <div className="mt-4">
            <SentimentBadge sentiment={sentiment} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">AI Summary</h3>
        <p className="text-gray-700 whitespace-pre-line">{aiSummary}</p>
      </div>
    </div>
  );
}
