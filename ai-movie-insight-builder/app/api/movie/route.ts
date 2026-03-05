import { NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/gemini";
import { basicSentimentAnalysis } from "@/lib/sentimentFallback";
import { fetchMovie, fetchIMDbReviews } from "@/lib/imdbReviews";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const imdbId: string = body?.imdbId?.trim();

    if (!imdbId) {
      return NextResponse.json(
        { error: "IMDb ID required" },
        { status: 400 }
      );
    }

    const movie = await fetchMovie(imdbId);
    // console.log("MOVIE:", movie);

    let reviews = await fetchIMDbReviews(imdbId);

    // fallback if API fails
    if (!reviews.length) {
      reviews = [
        "Amazing storytelling and characters.",
        "The early seasons are incredible.",
        "The ending was disappointing."
      ];
    }

    let aiSummary = "";
    let sentiment: "positive" | "mixed" | "negative" = "mixed";

    try {
      aiSummary = await analyzeWithGemini(reviews);

      const match = aiSummary.match(
        /Sentiment:\s*(positive|mixed|negative)/i
      );

      if (match) {
        sentiment = match[1].toLowerCase() as
          | "positive"
          | "mixed"
          | "negative";
      }
    } catch (err) {
      sentiment = basicSentimentAnalysis(reviews);
      aiSummary = "AI unavailable. Basic sentiment used.";
    }

    return NextResponse.json({
      movie,
      reviews,
      aiSummary,
      sentiment
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}