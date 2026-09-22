import Link from "next/link";
import { mockListings, getAvatarUrl, formatTimeAgo } from "@/lib/data";
import { CATEGORY_LABELS, type Category } from "@/lib/types";

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category: cat, subcategory: sub } = await params;
  const category = cat as Category;
  const subcategory = sub.replace(/-/g, " ");
  const categoryLabel = CATEGORY_LABELS[category] ?? category;

  const filtered = mockListings.filter(
    (l) => l.category === category && l.subcategory === subcategory
  );

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
        {" "}&gt; <strong>{subcategory}</strong>
      </div>

      <div className="cl-container">
        <h2 style={{ fontSize: "14px", fontWeight: "bold", margin: "8px 0" }}>
          {subcategory} ({filtered.length})
        </h2>

        {filtered.length === 0 ? (
          <p style={{ color: "#666", fontSize: "13px", padding: "12px 0" }}>
            No listings yet. <Link href="/post">Post the first one</Link>
          </p>
        ) : (
          <ul className="cl-listing-list">
            {filtered.map((listing) => (
              <li key={listing.id}>
                <Link href={`/listing/${listing.id}`}>
                  {listing.title}
                </Link>
                {listing.metadata.price !== undefined && (
                  <span className="price">(${listing.metadata.price})</span>
                )}
                {listing.metadata.salaryRange && (
                  <span className="price">({listing.metadata.salaryRange})</span>
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
