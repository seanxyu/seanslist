import Link from "next/link";
import { mockListings, getAvatarUrl, formatTimeAgo } from "@/lib/data";
import { CATEGORY_LABELS, SUBCATEGORIES, type Category } from "@/lib/types";

export function generateStaticParams() {
  const params: { category: string; subcategory?: string }[] = [];
  (Object.keys(SUBCATEGORIES) as Category[]).forEach((cat) => {
    params.push({ category: cat });
    SUBCATEGORIES[cat].forEach((sub) => {
      params.push({ category: cat, subcategory: sub.replace(/\s+/g, "-") });
    });
  });
  return params;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory?: string }>;
}) {
  const { category: cat, subcategory: sub } = await params;
  const category = cat as Category;
  const subcategory = sub ? sub.replace(/-/g, " ") : undefined;

  const filtered = mockListings.filter((l) => {
    if (l.category !== category) return false;
    if (subcategory && l.subcategory !== subcategory) return false;
    return true;
  });

  const categoryLabel = CATEGORY_LABELS[category] || category;

  return (
    <>
      <header className="cl-header">
        <Link href="/" className="logo">
          Sean&apos;s List
        </Link>
        <div className="tagline">san francisco</div>
        <nav className="nav">
          <Link href="/">home</Link>
          <Link href="/post">post</Link>
          <Link href="/account">my account</Link>
        </nav>
      </header>

      <div className="cl-city">
        <strong>san francisco</strong> &gt;{" "}
        <Link href={`/${category}`}>{categoryLabel}</Link>
        {subcategory && (
          <>
            {" "}&gt; <strong>{subcategory}</strong>
          </>
        )}
      </div>

      <div className="cl-container">
        <h2 style={{ fontSize: "14px", fontWeight: "bold", margin: "8px 0" }}>
          {subcategory ? subcategory : categoryLabel} ({filtered.length})
        </h2>

        {filtered.length === 0 ? (
          <p style={{ color: "#666", fontSize: "13px", padding: "12px 0" }}>
            No listings yet.{" "}
            <Link href="/post">Post the first one</Link>
          </p>
        ) : (
          <ul className="cl-listing-list">
            {filtered.map((listing) => (
              <li key={listing.id}>
                <Link href={`/listing/${listing.id}`}>
                  {listing.title}
                </Link>
                {listing.metadata.price !== undefined && (
                  <span className="price">
                    (${listing.metadata.price})
                  </span>
                )}
                {listing.metadata.salaryRange && (
                  <span className="price">
                    ({listing.metadata.salaryRange})
                  </span>
                )}
                <span className="meta">
                  {listing.anonHandle} &middot; {formatTimeAgo(listing.createdAt)}
                  {listing.isCurated && (
                    <span className="curated-badge">curated</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="cl-footer">
        Sean&apos;s List &mdash; postings are public, seeking is private.
      </footer>
    </>
  );
}
