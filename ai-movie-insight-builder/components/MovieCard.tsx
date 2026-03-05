import SentimentBadge from "./SentimentBadge";

export default function MovieCard({ data }: any) {
  const { movie, aiSummary, sentiment } = data;

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mt-6">
      <div className="flex gap-6">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-40 rounded"
        />

        <div>
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <p>{movie.year}</p>
          <p>Rating: {movie.rating}</p>
          <p className="mt-2">
            <span className="font-semibold">Cast:</span>{" "}
            {movie.cast?.join(", ")}
          </p>
          <p className="mt-2">{movie.plot}</p>

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