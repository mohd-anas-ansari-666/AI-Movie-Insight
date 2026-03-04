# 🎬 AI Movie Insight Builder

A full-stack Next.js application that fetches movie details using an IMDb ID and generates AI-powered audience sentiment insights.

Built as part of a Full-Stack Developer Internship Assignment.

---

## 🚀 Features

- 🔎 Search movie using IMDb ID (e.g., `tt0133093`)
- 🎥 Fetch movie details:
  - Title
  - Poster
  - Release Year
  - IMDb Rating
  - Plot Summary
  - Cast List
- 🤖 AI-powered audience sentiment analysis
- 📊 Overall sentiment classification:
  - Positive
  - Mixed
  - Negative
- 🛡 Fallback sentiment engine (if AI unavailable)
- 📱 Responsive minimal UI
- ⚡ Clean and modular architecture

---

## 🏗 Tech Stack

### Frontend
- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes (Node.js runtime)

### APIs Used
- **OMDb API** – Movie metadata
- **Google Gemini API** – AI sentiment analysis

---

## 🧠 Architecture Overview

```

User Input (IMDb ID)
↓
Next.js API Route (/api/movie)
↓
Fetch movie data from OMDb
↓
Generate mock reviews
↓
Analyze reviews using Gemini AI
↓
Return structured JSON response
↓
Frontend renders movie + insights

````

### Why Backend Processing?

- Keeps API keys secure
- AI processing happens server-side
- Prevents exposing Gemini credentials
- Cleaner separation of concerns

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/mohd-anas-ansari-666/AI-Movie-Insight.git
cd AI-Movie-Insight
cd ai-movie-insight-builder
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a file named:

```
.env.local
```

Add:

```
OMDB_API_KEY=your_omdb_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🔑 API Key Setup

### OMDb API

1. Visit: [http://www.omdbapi.com/apikey.aspx](http://www.omdbapi.com/apikey.aspx)
2. Generate a free API key
3. Add to `.env.local`

### Gemini API

1. Visit: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Create API key
3. Enable "Generative Language API"
4. Add to `.env.local`

⚠️ If Gemini API fails, the app automatically falls back to a basic keyword-based sentiment analyzer.

---

## 🧪 Example IMDb IDs for Testing

| Movie           | IMDb ID   |
| --------------- | --------- |
| The Matrix      | tt0133093 |
| Inception       | tt1375666 |
| Interstellar    | tt0816692 |
| The Dark Knight | tt0468569 |

---

## 🧩 Assumptions Made

* IMDb does not allow direct scraping → OMDb API used instead.
* AI summary parsing assumes structured response format.
* Sentiment extraction uses regex matching for reliability.

---

## 🛡 Error Handling

* Validates IMDb ID input
* Handles invalid movie IDs
* Gracefully falls back if AI service fails
* Server-side error logging

---

## 📂 Project Structure

```
app/
  api/movie/route.ts
  layout.tsx
  page.tsx
components/
  MovieCard.tsx
  SearchForm.tsx
  SentimentBadge.tsx
lib/
  omdb.ts
  gemini.ts
  sentimentFallback.ts
types/
  movie.ts
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

To deploy on Vercel:

1. Push code to GitHub
2. Import project into Vercel
3. Add environment variables in Vercel dashboard
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
