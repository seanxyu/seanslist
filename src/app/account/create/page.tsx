import Link from "next/link";

export default function CreateAccountPage() {
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
        <strong>san francisco</strong> &gt; create account
      </div>

      <div className="cl-container">
        <h2 style={{ fontSize: "14px", fontWeight: "bold", margin: "12px 0" }}>
          Create an account
        </h2>
        <div style={{ fontSize: "12px", color: "#666", maxWidth: "500px" }}>
          <p>
            Your account is a pseudonymous identity. We generate a handle (like{" "}
            <code>anon_4f2a</code>) and an encryption key for you. No email, no
            password, no personal data.
          </p>
          <p style={{ marginTop: "12px" }}>
            <strong>Your recovery phrase:</strong>
          </p>
          <div
            style={{
              background: "#f8f8f0",
              border: "1px solid #ccc",
              padding: "12px",
              fontFamily: "monospace",
              fontSize: "12px",
              margin: "8px 0",
            }}
          >
            apple bridge castle dragon eagle forest garden harbor island
            jasmine knight lantern meadow nest ocean pearl quartz river
            sunset thunder umbrella valley waterfall
          </div>
          <p style={{ color: "#cc0000", fontSize: "11px" }}>
            Write this down. If you lose it, you lose access to your account and
            all messages. We cannot recover it for you.
          </p>
          <p style={{ marginTop: "16px" }}>
            <button
              style={{
                padding: "6px 16px",
                fontSize: "14px",
                fontFamily: '"Times New Roman", Times, serif',
                background: "#0000ee",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              I saved my recovery phrase — create my account
            </button>
          </p>
        </div>
      </div>

      <footer className="cl-footer">
        Sean&apos;s List &mdash; postings are public, seeking is private.
      </footer>
    </>
  );
}
