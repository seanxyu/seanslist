import type { Category } from "@/lib/types";

// Plain GET form to /search — works without JavaScript.
export default function SearchForm({
  query = "",
  category,
}: {
  query?: string;
  category?: Category;
}) {
  return (
    <form action="/search" method="get" role="search" className="search">
      <label htmlFor="search-q" className="visually-hidden">
        Search listings
      </label>
      <input
        id="search-q"
        name="q"
        className="input"
        defaultValue={query}
        placeholder="What are you looking for?"
        maxLength={80}
      />
      {category && <input type="hidden" name="category" value={category} />}
      <button type="submit" className="btn">
        Search
      </button>
    </form>
  );
}
