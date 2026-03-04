"use client";

import { useState } from "react";

export default function SearchForm({ onSearch }: any) {
  const [imdbId, setImdbId] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(imdbId);
      }}
      className="flex gap-2"
    >
      <input
        value={imdbId}
        onChange={(e) => setImdbId(e.target.value)}
        placeholder="Enter IMDb ID (e.g., tt0133093)"
        className="border px-3 py-2 rounded w-full"
      />
      <button className="bg-black text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
}
