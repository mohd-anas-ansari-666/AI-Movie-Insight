export default function SentimentBadge({ sentiment }: { sentiment: string }) {
  const color =
    sentiment === "positive"
      ? "bg-green-500"
      : sentiment === "negative"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <span className={`${color} text-white px-3 py-1 rounded-full`}>
      {sentiment.toUpperCase()}
    </span>
  );
}
