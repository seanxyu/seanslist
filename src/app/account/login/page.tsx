import Link from "next/link";
import { TopBar } from "@/components/SiteHeader";

// Placeholder until the account API exists (PLAN.md Phase 1: POST /api/account/login).
export default function LoginPage() {
  return (
    <main className="page">
      <TopBar
        crumbs={
          <>
            <Link href="/account">account</Link> / log in
          </>
        }
      />
      <div className="panel">
        <h1 className="page-title">Log in</h1>
        <p className="notice">
          Logging in isn&apos;t available yet — accounts are coming with the backend.
        </p>
        <div>
          <Link href="/" className="btn">
            Back to the board
          </Link>
        </div>
      </div>
    </main>
  );
}
