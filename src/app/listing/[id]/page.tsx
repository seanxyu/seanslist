"use client";

import Link from "next/link";
import { use, useState } from "react";
import {
  mockListings,
  mockComments,
  mockReactions,
  getAvatarUrl,
  formatTimeAgo,
} from "@/lib/data";
import { CATEGORY_LABELS, REACTION_TYPES, type ReactionType } from "@/lib/types";

export default function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const listing = mockListings.find((l) => l.id === id);
  const [activeReactions, setActiveReactions] = useState<Set<ReactionType>>(
    new Set()
  );

  if (!listing) {
    return (
      <>
        <header className="cl-header">
          <Link href="/" className="logo">
            Sean&apos;s List
          </Link>
          <nav className="nav">
            <Link href="/">home</Link>
          </nav>
        </header>
        <div className="cl-container">
          <p>Listing not found.</p>
          <p>
            <Link href="/">Back to home</Link>
          </p>
        </div>
      </>
    );
  }

  const comments = mockComments.filter((c) => c.listingId === id);
  const reactions = mockReactions[id] || [];

  const toggleReaction = (type: ReactionType) => {
    setActiveReactions((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

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
        <Link href={`/${listing.category}`}>
          {CATEGORY_LABELS[listing.category]}
        </Link>{" "}
        &gt; <strong>{listing.title}</strong>
      </div>

      <div className="cl-container">
        <div className="cl-listing-detail">
          <div className="breadcrumb">
            {listing.subcategory} &middot;{" "}
            <Link href={`/${listing.category}`}>
              {CATEGORY_LABELS[listing.category]}
            </Link>
          </div>

          <div className="title">{listing.title}</div>

          <div className="poster">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src={getAvatarUrl(listing.avatarSeed)}
              alt=""
              className="avatar"
            />
            <strong>{listing.anonHandle}</strong> &middot;{" "}
            {formatTimeAgo(listing.createdAt)} &middot; {listing.viewCount}{" "}
            views
            {listing.isCurated && (
              <span className="curated-badge">curated</span>
            )}
          </div>

          <div className="body">{listing.body}</div>

          <div className="metadata">
            {listing.metadata.price !== undefined && (
              <span className="field">
                <strong>${listing.metadata.price}</strong>
              </span>
            )}
            {listing.metadata.salaryRange && (
              <span className="field">
                <strong>{listing.metadata.salaryRange}</strong>
              </span>
            )}
            {listing.metadata.location && (
              <span className="field">📍 {listing.metadata.location}</span>
            )}
            {listing.metadata.skills && (
              <span className="field">
                skills: {listing.metadata.skills.join(", ")}
              </span>
            )}
          </div>

          {/* Reaction bar — the one modern-looking element */}
          <div className="reaction-bar">
            {REACTION_TYPES.map(({ type, glyph, label }) => {
              const count =
                reactions.find((r) => r.type === type)?.count || 0;
              const isActive = activeReactions.has(type);
              const displayCount = count + (isActive ? 1 : 0);
              return (
                <button
                  key={type}
                  className={`reaction-btn ${isActive ? "active" : ""}`}
                  onClick={() => toggleReaction(type)}
                  type="button"
                >
                  <span className="emoji">{glyph}</span>
                  <span className="count">{displayCount}</span>
                </button>
              );
            })}
          </div>

          {/* Comment thread */}
          <div className="comment-thread">
            <div className="header">Comments ({comments.length})</div>
            {comments.length === 0 ? (
              <p style={{ color: "#666", fontSize: "13px" }}>
                No comments yet. Be the first to say something.
              </p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    {/* eslint-disable @next/next/no-img-element */}
                    <img
                      src={getAvatarUrl(comment.avatarSeed)}
                      alt=""
                      className="avatar"
                    />
                    <span className="anon">{comment.anonHandle}</span>
                    <span className="time">
                      &middot; {formatTimeAgo(comment.createdAt)}
                    </span>
                    {comment.isAgent && (
                      <span className="agent-tag">agent</span>
                    )}
                  </div>
                  <div className="body">{comment.body}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <footer className="cl-footer">
        Sean&apos;s List &mdash; postings are public, seeking is private.
      </footer>
    </>
  );
}
