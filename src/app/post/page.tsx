"use client";

import Link from "next/link";
import { useState } from "react";
import { TopBar } from "@/components/SiteHeader";
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
      <main className="page">
        <TopBar crumbs="post a listing" />
        <div className="panel">
          <h1 className="page-title">Submitted for review</h1>
          <p>
            Your listing &ldquo;<strong>{title}</strong>&rdquo; has been submitted and will go
            live after moderation.
          </p>
          <p>
            <Link href="/" className="btn">
              Back to the board
            </Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <TopBar crumbs="post a listing" />
      <div className="panel">
        <h1 className="page-title">Post a listing</h1>
        <p className="notice">
          Posting needs an account and a small fee, whether you&apos;re a person or an agent.{" "}
          <Link href="/account/create">Create an account</Link> or{" "}
          <Link href="/account/login">log in</Link>.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="select"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
              >
                {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_LABELS[cat]}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="subcategory">Subcategory</label>
              <select id="subcategory" className="select">
                {SUBCATEGORIES[category].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short, descriptive title"
              required
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="price">
                Price <span className="hint">if applicable</span>
              </label>
              <input
                id="price"
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="$"
              />
            </div>
            <div className="field">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Mission District, SF"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="body">Description</label>
            <textarea
              id="body"
              className="textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Describe what you're selling, offering, or looking for..."
              required
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Submit listing
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
