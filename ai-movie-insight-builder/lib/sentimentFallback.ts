export function basicSentimentAnalysis(reviews: string[]) {
  const positiveWords = ["great", "amazing", "excellent", "masterpiece", "good"];
  const negativeWords = ["bad", "boring", "worst", "terrible", "waste"];

  let score = 0;

  reviews.forEach((review) => {
    positiveWords.forEach((word) => {
      if (review.toLowerCase().includes(word)) score++;
    });

    negativeWords.forEach((word) => {
      if (review.toLowerCase().includes(word)) score--;
    });
  });

  if (score > 2) return "positive";
  if (score < -2) return "negative";
  return "mixed";
}
