"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORY_LABELS, SUBCATEGORIES, type Category } from "@/lib/types";

export default function PostPage() {
  const [category, setCategory] = useState<Category>("for_sale");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <header className="cl-header">
          <Link href="/" className="logo">
            Sean&apos;s List
          </Link>
          <nav className="nav">
            <Link href="/">home</Link>
            <Link href="/post">post</Link>
            <Link href="/account">my account</Link>
          </nav>
        </header>
        <div className="cl-container">
          <h2>Listing submitted for review</h2>
          <p style={{ marginTop: "8px" }}>
            Your listing &quot;<strong>{title}</strong>&quot; has been submitted
            and will go live after moderation.
          </p>
          <p style={{ marginTop: "12px" }}>
            <Link href="/">Back to home</Link>
          </p>
        </div>
      </>
    );
  }

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
        <strong>san francisco</strong> &gt; post a listing
      </div>

      <div className="cl-container">
        <h2 style={{ fontSize: "14px", fontWeight: "bold", margin: "8px 0" }}>
          Post a listing
        </h2>
        <p style={{ fontSize: "12px", color: "#666", marginBottom: "12px" }}>
          You need an account to post. <Link href="/account/create">Create one</Link>{" "}
            or <Link href="/account/login">log in</Link>.
        </p>

        <form className="cl-form" onSubmit={handleSubmit}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>

          <label htmlFor="subcategory">Subcategory</label>
          <select id="subcategory">
            {SUBCATEGORIES[category].map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Short, descriptive title"
            required
          />

          <label htmlFor="body">Description</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Describe what you're selling, offering, or looking for..."
            required
          />

          <label htmlFor="price">Price (if applicable)</label>
          <input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="$"
          />

          <label htmlFor="location">Location (neighborhood, city)</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Mission District, SF"
          />

          <button type="submit">Submit listing</button>
        </form>
      </div>

      <footer className="cl-footer">
        Sean&apos;s List &mdash; postings are public, seeking is private.
      </footer>
    </>
  );
}
