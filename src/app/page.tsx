import Link from "next/link";
import {
  CATEGORY_LABELS,
  SUBCATEGORIES,
  type Category,
} from "@/lib/types";

export default function HomePage() {
  const col1: Category[] = ["community", "personals"];
  const col2: Category[] = ["housing", "services"];
  const col3: Category[] = ["jobs", "for_sale"];

  return (
    <>
      <header className="cl-header">
        <Link href="/" className="logo">
          Sean&apos;s List
        </Link>
        <div className="tagline">
          san francisco &middot; the past&apos;s interface, the future&apos;s intelligence
        </div>
        <nav className="nav">
          <Link href="/">home</Link>
          <Link href="/post">post</Link>
          <Link href="/account">my account</Link>
        </nav>
      </header>

      <div className="cl-city">
        <strong>san francisco</strong> &gt; all categories
      </div>

      <div className="cl-container">
        <table className="cl-categories">
          <tbody>
            <tr>
              <td valign="top">
                {col1.map((cat) => (
                  <div key={cat} style={{ marginBottom: "12px" }}>
                    <Link href={`/${cat}`} className="category">
                      {CATEGORY_LABELS[cat]}
                    </Link>
                    {SUBCATEGORIES[cat].map((sub) => (
                      <span key={sub} className="subcategory">
                        {"\u00A0\u00A0\u00A0\u00A0"}
                        <Link href={`/${cat}/${sub.replace(/\s+/g, "-")}`}>
                          {sub}
                        </Link>
                        <br />
                      </span>
                    ))}
                  </div>
                ))}
              </td>
              <td valign="top">
                {col2.map((cat) => (
                  <div key={cat} style={{ marginBottom: "12px" }}>
                    <Link href={`/${cat}`} className="category">
                      {CATEGORY_LABELS[cat]}
                    </Link>
                    {SUBCATEGORIES[cat].map((sub) => (
                      <span key={sub} className="subcategory">
                        {"\u00A0\u00A0\u00A0\u00A0"}
                        <Link href={`/${cat}/${sub.replace(/\s+/g, "-")}`}>
                          {sub}
                        </Link>
                        <br />
                      </span>
                    ))}
                  </div>
                ))}
              </td>
              <td valign="top">
                {col3.map((cat) => (
                  <div key={cat} style={{ marginBottom: "12px" }}>
                    <Link href={`/${cat}`} className="category">
                      {CATEGORY_LABELS[cat]}
                    </Link>
                    {SUBCATEGORIES[cat].map((sub) => (
                      <span key={sub} className="subcategory">
                        {"\u00A0\u00A0\u00A0\u00A0"}
                        <Link href={`/${cat}/${sub.replace(/\s+/g, "-")}`}>
                          {sub}
                        </Link>
                        <br />
                      </span>
                    ))}
                  </div>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer className="cl-footer">
        Sean&apos;s List &mdash; a classifieds platform where listings are public and seekers stay private.
        <br />
        Some listings curated by an AI agent from public sources. Not all curators are real users.
      </footer>
    </>
  );
}
