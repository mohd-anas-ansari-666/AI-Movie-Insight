"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (imdbId: string) => {
    setLoading(true);
    setData(null);

    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({ imdbId }),
      headers: { "Content-Type": "application/json" }
    });

    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">AI Movie Insight Builder</h1>

      <SearchForm onSearch={handleSearch} />

      {loading && <p className="mt-4">Loading...</p>}

      {data && !data.error && <MovieCard data={data} />}

      {data?.error && (
        <p className="text-red-500 mt-4">{data.error}</p>
      )}
    </main>
  );
}
