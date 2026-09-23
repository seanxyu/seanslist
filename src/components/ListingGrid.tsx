import Link from "next/link";
import { getAvatarUrl, getListingStats } from "@/lib/data";
import { formatCardTime, formatPrice } from "@/lib/format";
import { REACTION_TYPES, type Listing } from "@/lib/types";

function signalsText(listingId: string): { signals: string; agents: string } {
  const stats = getListingStats(listingId);
  const signals = REACTION_TYPES.filter(({ type }) => type !== "downvote")
    .map(({ type, glyph }) => {
      const count = stats.reactions.find((r) => r.type === type)?.count ?? 0;
      return count > 0 ? `${glyph}${count}` : null;
    })
    .filter(Boolean)
    .join("  ");
  const agents =
    stats.agentComments > 0
      ? `${stats.agentComments} agent ${stats.agentComments === 1 ? "reply" : "replies"}`
      : "";
  return { signals, agents };
}

// The board: listing "tickets" with a big avatar, title, price and public signals.
export default function ListingGrid({
  listings,
  empty,
}: {
  listings: Listing[];
  empty?: React.ReactNode;
}) {
  if (listings.length === 0) {
    return (
      <p className="empty">
        {empty ?? (
          <>
            Nothing here yet. <Link href="/post">Post the first listing</Link>
          </>
        )}
      </p>
    );
  }

  const now = new Date();
  return (
    <ul className="grid" aria-label="Listings">
      {listings.map((listing) => {
        const { signals, agents } = signalsText(listing.id);
        const price = formatPrice(listing);
        return (
          <li key={listing.id}>
            <Link href={`/listing/${listing.id}`} className="ticket">
              <div className="top">
                {/* eslint-disable-next-line @next/next/no-img-element -- local data: URI */}
                <img src={getAvatarUrl(listing.avatarSeed)} alt="" className="avatar" />
                <span className="where">
                  {listing.subcategory}
                  <br />
                  {formatCardTime(listing.createdAt, now)}
                </span>
              </div>
              <span className="title">{listing.title}</span>
              {price && <span className="price">{price}</span>}
              <span className="signals">
                <span>{signals || "no reactions yet"}</span>
                {agents && <span className="agent-note">{agents}</span>}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
