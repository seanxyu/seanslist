import Link from "next/link";
import CategoryChips from "./CategoryChips";
import ListingGrid from "./ListingGrid";
import SearchForm from "./SearchForm";
import { TopBar } from "./SiteHeader";
import { getListings } from "@/lib/data";
import {
  CATEGORY_LABELS,
  SUBCATEGORIES,
  subcategorySlug,
  type Category,
} from "@/lib/types";

// Shared by /[category] and /[category]/[subcategory].
export default function CategoryPage({
  category,
  subcategory,
}: {
  category: Category;
  subcategory?: string;
}) {
  const listings = getListings(category, subcategory);
  const label = CATEGORY_LABELS[category];

  return (
    <main className="page">
      <TopBar
        crumbs={
          subcategory ? (
            <>
              <Link href={`/${category}`}>{label}</Link> / {subcategory}
            </>
          ) : (
            label
          )
        }
      />
      <CategoryChips active={category} />

      <h1 className="page-title">
        {subcategory ?? label}
        <span className="count">
          {listings.length} {listings.length === 1 ? "listing" : "listings"}
        </span>
      </h1>

      <nav aria-label={`${label} subcategories`}>
        <ul className="chips chips-sub">
          <li>
            <Link
              href={`/${category}`}
              className="chip"
              aria-current={subcategory ? undefined : "page"}
            >
              all {label}
            </Link>
          </li>
          {SUBCATEGORIES[category].map((sub) => (
            <li key={sub}>
              <Link
                href={`/${category}/${subcategorySlug(sub)}`}
                className="chip"
                aria-current={sub === subcategory ? "page" : undefined}
              >
                {sub}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <SearchForm category={category} />
      <ListingGrid listings={listings} />
    </main>
  );
}
