import CategoryChips from "@/components/CategoryChips";
import ListingGrid from "@/components/ListingGrid";
import SearchForm from "@/components/SearchForm";
import { TopBar } from "@/components/SiteHeader";
import { searchListings } from "@/lib/data";
import { CATEGORY_LABELS, isCategory, type Category } from "@/lib/types";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; category?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const rawCategory = typeof params.category === "string" ? params.category : "";
  const category = isCategory(rawCategory) ? rawCategory : undefined;

  const listings = searchListings(query, category);
  const scope = category ? CATEGORY_LABELS[category] : "everything";

  // Switching category keeps the current query.
  const hrefFor = (cat?: Category) => {
    const qs = new URLSearchParams();
    if (query) qs.set("q", query);
    if (cat) qs.set("category", cat);
    const s = qs.toString();
    return s ? `/search?${s}` : "/search";
  };

  return (
    <main className="page">
      <TopBar crumbs="search" />
      <SearchForm query={query} category={category} />
      <CategoryChips active={category} hrefFor={hrefFor} />
      <h1 className="page-title">
        {query ? <>&ldquo;{query}&rdquo;</> : "Search"}
        <span className="count">
          {listings.length} {listings.length === 1 ? "result" : "results"} in {scope}
        </span>
      </h1>
      <ListingGrid
        listings={listings}
        empty={<>No listings match{query ? <> &ldquo;{query}&rdquo;</> : ""}. Try fewer words, or another category.</>}
      />
    </main>
  );
}
