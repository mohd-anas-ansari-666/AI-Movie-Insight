# 🎬 AI Movie Insight Builder

A full-stack **Next.js 14** application that fetches movie details using an IMDb ID via **IMDb’s internal GraphQL API** and generates **AI-powered audience sentiment insights** using Google Gemini.

Built as part of a Full-Stack Developer Internship Assignment.

---

## 🚀 Features

* 🔎 Search movie using IMDb ID (e.g., `tt0133093`)
* 🎥 Fetch movie details using GraphQL:

  * Title
  * Poster
  * Release Year
  * IMDb Rating
  * Plot Summary
  * Cast List
* 🤖 AI-powered audience sentiment analysis
* 📊 Overall sentiment classification:

  * Positive
  * Mixed
  * Negative
* 🛡 Fallback sentiment engine if AI unavailable
* 📱 Responsive minimal UI
* ⚡ Clean and modular architecture

---

## 🏗 Tech Stack

### Frontend

* Next.js 14 (App Router)
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* Node.js runtime
* **GraphQL** for fetching IMDb data
* **Google Gemini API** for AI sentiment analysis

### APIs Used

* **IMDb GraphQL API** – Movie metadata, cast, ratings, poster
* **Google Gemini API** – AI sentiment analysis

---

## 🧠 Architecture Overview

```text
User Input (IMDb ID)
↓
Next.js API Route (/api/movie)
↓
Fetch movie data via IMDb GraphQL
↓
Fetch reviews
↓
Analyze reviews using Gemini AI
↓
Return structured JSON response
↓
Frontend renders movie + insights
```
---

## 📡 GraphQL Query Examples

You can fetch rich movie data from IMDb’s internal GraphQL API. Below are example queries you can use in your project.

### 1️⃣ Fetch Movie Details

```graphql
query TitleDetails($const: ID!) {
  title(id: $const) {
    id
    titleText {
      text
    }
    releaseYear {
      year
    }
    ratingsSummary {
      aggregateRating
    }
    plot {
      plotText {
        plainText
      }
    }
  }
}
```

**Variables Example:**

```json
{
  "const": "tt0944947"
}
```

---

### 2️⃣ Fetch Poster & Cast List

```graphql
query TitleWithCast($const: ID!) {
  title(id: $const) {
    id
    titleText { text }
    releaseYear { year }
    ratingsSummary { aggregateRating }
    plot { plotText { plainText } }
    primaryImage {
      url
    }
    principalCast {
      edges {
        node {
          id
          name { nameText { text } }
          category
        }
      }
    }
  }
}
```

**Notes:**

* `primaryImage.url` → Movie poster URL
* `principalCast.edges.node.name.nameText.text` → Actor/actress names
* `principalCast.edges.node.category` → Role category (e.g., actor, actress, director)

**Variables Example:**

```json
{
  "const": "tt0944947"
}
```

---

### 3️⃣ Fetch Reviews (Optional)

```graphql
query TitleReviews($const: ID!, $first: Int!) {
  title(id: $const) {
    reviews(first: $first) {
      edges {
        node {
          id
          author { nickName }
          authorRating
          submissionDate
          text { originalText { plainText } }
          summary { originalText }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
```

**Variables Example:**

```json
{
  "const": "tt0944947",
  "first": 10
}
```

---

💡 **Tip:**

* Use `fetch` with `POST` method to call these queries from your Next.js API routes.
* Include headers:

```ts
{
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Origin": "https://www.imdb.com",
  "Referer": "https://www.imdb.com/",
  "User-Agent": "Mozilla/5.0"
}
```
---

### Why Backend Processing?

* Keeps API keys secure
* AI processing happens server-side
* Prevents exposing Gemini credentials
* Cleaner separation of concerns

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/mohd-anas-ansari-666/AI-Movie-Insight.git
cd AI-Movie-Insight/ai-movie-insight-builder
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a file named `.env.local` and add:

```bash
GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ IMDb GraphQL access does not require a public API key but follows IMDb’s terms of use.

### 4️⃣ Run Development Server

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## 🔑 API Key Setup

### Gemini API

1. Visit: [Google AI Studio – Generative Language API](https://aistudio.google.com/app/apikey)
2. Create an API key
3. Enable "Generative Language API"
4. Add to `.env.local`

⚠️ If Gemini API fails, the app falls back to a **basic keyword-based sentiment analyzer**.

---

## 🧪 Example IMDb IDs for Testing

| Movie           | IMDb ID   |
| --------------- | --------- |
| The Matrix      | tt0133093 |
| Inception       | tt1375666 |
| Interstellar    | tt0816692 |
| The Dark Knight | tt0468569 |
| Game of Thrones | tt0944947 |

---

## 🧩 Assumptions Made

* IMDb GraphQL is used instead of OMDb to fetch richer data (poster, cast, ratings, plot).
* AI summary parsing assumes a structured response format.
* Sentiment extraction uses regex matching for reliability.
* Poster and cast list fetched directly from IMDb’s GraphQL API.

---

## 🛡 Error Handling

* Validates IMDb ID input
* Handles missing or invalid movie IDs
* Gracefully falls back if AI service fails
* Server-side error logging

---

## 📂 Project Structure

```
app/
  api/movie/route.ts           # API route for fetching movie + AI insights
  layout.tsx
  page.tsx
components/
  MovieCard.tsx                # Renders movie info + AI summary + sentiment
  SearchForm.tsx
  SentimentBadge.tsx
lib/
  imdbReviews.ts               # GraphQL client for fetching movie data
  gemini.ts                    # AI Gemini analysis
  sentimentFallback.ts         # Fallback sentiment engine
types/
  movie.ts                     # TypeScript types for movie, cast, and review
```

---

## 🚀 Future Improvements

* Real audience review integration (Rotten Tomatoes / TMDb)
* Structured JSON AI response instead of text parsing
* Caching responses (Redis or in-memory cache)
* Loading animations
* Pagination for reviews
* Dark mode UI
* Deployment to Vercel

---

## 🌍 Deployment

To deploy on **Vercel**:

1. Push code to GitHub
2. Import project into Vercel
3. Add environment variables (`GEMINI_API_KEY`) in Vercel dashboard
4. Deploy

---

## 💡 Design Philosophy

* Minimal UI, fully functional
* Clean, maintainable code
* Proper separation of frontend & backend concerns
* Graceful degradation strategy
* Interview-ready structure

---

## 👨‍💻 Author

Built by: *Mohd Anas Ansari*
For: Full-Stack Developer Internship Assignment

---

## 📜 License

This project is built for educational and evaluation purposes.