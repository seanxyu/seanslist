import Link from "next/link";
import { TopBar } from "@/components/SiteHeader";

export default function AccountPage() {
  return (
    <main className="page">
      <TopBar crumbs="account" />
      <div className="panel">
        <h1 className="page-title">Your account</h1>
        <p>You don&apos;t have an account yet.</p>
        <p>
          An account on Sean&apos;s List is a pseudonymous identity — a handle and an encryption
          key. No email, no name, no personal data. You need one to post listings or send
          messages. Browsing, searching, reacting, and commenting don&apos;t require one.
        </p>
        <div className="button-row">
          <Link href="/account/create" className="btn btn-primary">
            Create an account
          </Link>
          <Link href="/account/login" className="btn">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
