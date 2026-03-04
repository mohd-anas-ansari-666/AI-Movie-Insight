import { NextResponse } from "next/server";
import { fetchMovie } from "@/lib/omdb";
import { analyzeWithGemini } from "@/lib/gemini";
import { basicSentimentAnalysis } from "@/lib/sentimentFallback";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const imdbId: string = body?.imdbId?.trim();

    if (!imdbId) {
      return NextResponse.json(
        { error: "IMDb ID is required" },
        { status: 400 }
      );
    }

    // Fetch movie details from OMDb
    const movie = await fetchMovie(imdbId);

    // Mock reviews (IMDb scraping restricted)
    const reviews: string[] = [
      "This movie is a masterpiece with amazing performances.",
      "Great visuals and excellent storytelling.",
      "A bit slow in the middle but overall good experience.",
      "Not bad but could have been better.",
      "Fantastic direction and emotional depth."
    ];

    let aiSummary = "";
    let sentiment: "positive" | "mixed" | "negative" = "mixed";

    try {
      // Try Gemini AI
      aiSummary = await analyzeWithGemini(reviews);

      // Extract sentiment using regex (professional approach)
      const match = aiSummary.match(
        /Sentiment:\s*(positive|mixed|negative)/i
      );

      if (match) {
        sentiment = match[1].toLowerCase() as
          | "positive"
          | "mixed"
          | "negative";
      } else {
        sentiment = "mixed";
      }
    } catch (error) {
      console.error("Gemini error:", error);

      // Fallback to basic keyword sentiment
      sentiment = basicSentimentAnalysis(reviews);
      aiSummary =
        "AI service unavailable. Basic sentiment analysis applied.";
    }

    return NextResponse.json({
      movie,
      aiSummary,
      sentiment
    });
  } catch (error: any) {
    console.error("Server error:", error);

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
