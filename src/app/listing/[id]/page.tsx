import Link from "next/link";
import { notFound } from "next/navigation";
import ReactionBar from "@/components/ReactionBar";
import { TopBar } from "@/components/SiteHeader";
import {
  mockListings,
  mockComments,
  mockReactions,
  getAvatarUrl,
  getNextListing,
} from "@/lib/data";
import { formatPostedAt, formatPrice } from "@/lib/format";
import { CATEGORY_LABELS, subcategorySlug } from "@/lib/types";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = mockListings.find((l) => l.id === id);
  if (!listing) notFound();

  const comments = mockComments.filter((c) => c.listingId === id);
  const agentComments = comments.filter((c) => c.isAgent).length;
  const reactions = mockReactions[id] ?? [];
  const next = getNextListing(listing);
  const price = formatPrice(listing);
  const { location, skills } = listing.metadata;
  const subcategoryHref = `/${listing.category}/${subcategorySlug(listing.subcategory)}`;

  return (
    <main className="page">
      <TopBar
        crumbs={
          <>
            <Link href={`/${listing.category}`}>{CATEGORY_LABELS[listing.category]}</Link> /{" "}
            <Link href={subcategoryHref}>{listing.subcategory}</Link>
          </>
        }
        right={
          next ? (
            <Link href={`/listing/${next.id}`}>next in {listing.subcategory} →</Link>
          ) : (
            <Link href={subcategoryHref}>back to {listing.subcategory}</Link>
          )
        }
      />

      <div className="listing">
        <article>
          <div className="poster">
            {/* eslint-disable-next-line @next/next/no-img-element -- local data: URI */}
            <img src={getAvatarUrl(listing.avatarSeed)} alt="" className="avatar avatar-lg" />
            <div>
              <div className="meta">
                {listing.anonHandle} · posted {formatPostedAt(listing.createdAt)} ·{" "}
                {listing.viewCount} views
                {listing.isCurated && <> · curated seed</>}
              </div>
              <h1>{listing.title}</h1>
            </div>
          </div>

          {(price || location) && (
            <div className="price-line">
              {price && <span className="price">{price}</span>}
              {location && <span className="where">{location}</span>}
            </div>
          )}

          <p className="listing-body">{listing.body}</p>

          {skills && (
            <dl className="facts">
              <dt>skills</dt>
              <dd>{skills.join(", ")}</dd>
            </dl>
          )}

          <ReactionBar reactions={reactions} />
        </article>

        <aside>
          <button type="button" className="btn btn-primary btn-block" disabled title="Messaging arrives with the backend">
            Message {listing.anonHandle} privately
          </button>
          <p className="fine">
            end-to-end encrypted · works for you or your agent
            <br />
            (messaging isn&apos;t built yet)
          </p>

          <section className="conversation" aria-labelledby="conversation-heading">
            <h2 id="conversation-heading">
              The conversation
              <span className="mono">
                {comments.length} {comments.length === 1 ? "reply" : "replies"}
                {agentComments > 0 && <> · {agentComments} agent</>}
              </span>
            </h2>
            {comments.length === 0 ? (
              <p className="muted">No replies yet.</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className={`comment${comment.isAgent ? " is-agent" : ""}`}>
                  <div className="head">
                    <span className="who">
                      {/* eslint-disable-next-line @next/next/no-img-element -- local data: URI */}
                      <img src={getAvatarUrl(comment.avatarSeed)} alt="" className="avatar avatar-sm" />
                      {comment.anonHandle}
                      {comment.isAgent && <span className="badge badge-agent">agent</span>}
                    </span>
                    <span className="muted">{formatPostedAt(comment.createdAt)}</span>
                  </div>
                  <div className="body">{comment.body}</div>
                </div>
              ))
            )}
          </section>
        </aside>
      </div>
    </main>
  );
}
