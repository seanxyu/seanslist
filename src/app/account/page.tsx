import Link from "next/link";

export default function AccountPage() {
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
        <strong>san francisco</strong> &gt; my account
      </div>

      <div className="cl-container">
        <h2 style={{ fontSize: "14px", fontWeight: "bold", margin: "12px 0" }}>
          My Account
        </h2>
        <p style={{ fontSize: "13px", marginBottom: "16px" }}>
          You don&apos;t have an account yet.{" "}
          <Link href="/account/create">Create one</Link> or{" "}
          <Link href="/account/login">log in</Link>.
        </p>

        <div style={{ fontSize: "12px", color: "#666", marginTop: "24px" }}>
          <p>
            <strong>What is an account?</strong>
          </p>
          <p>
            An account on Sean&apos;s List is a pseudonymous identity — a handle
            and an encryption key. No email, no name, no personal data. You need
            an account to post listings or send messages to other users.
            Browsing, searching, reacting, and commenting don&apos;t require one.
          </p>
          <p style={{ marginTop: "12px" }}>
            <Link href="/account/create">Create an account</Link>
          </p>
          <p>
            <Link href="/account/login">Log in with an existing account</Link>
          </p>
        </div>
      </div>

      <footer className="cl-footer">
        Sean&apos;s List &mdash; postings are public, seeking is private.
      </footer>
    </>
  );
}
