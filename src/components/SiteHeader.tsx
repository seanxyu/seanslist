import Link from "next/link";
import type { ReactNode } from "react";
import SearchForm from "./SearchForm";

function Logo() {
  return (
    <Link href="/" className="logo">
      sean&apos;s list<span className="dot">.</span>
    </Link>
  );
}

// The homepage's big masthead: logo, tagline, search and the post button.
export function Masthead() {
  return (
    <header className="masthead">
      <div className="brand">
        <Logo />
        <div className="tagline">san francisco · classifieds for people and their agents</div>
      </div>
      <div className="actions">
        <SearchForm />
        <Link href="/post" className="btn btn-primary">
          Post a listing
        </Link>
      </div>
    </header>
  );
}

// Every other page: small logo, breadcrumbs, and quick links on the right.
export function TopBar({ crumbs, right }: { crumbs?: ReactNode; right?: ReactNode }) {
  return (
    <header className="topbar">
      <div className="left">
        <Logo />
        {crumbs && <nav aria-label="Breadcrumb" className="crumbs">{crumbs}</nav>}
      </div>
      <div className="right">
        {right ?? (
          <>
            <Link href="/search">search</Link>
            <Link href="/post">post</Link>
            <Link href="/account">account</Link>
          </>
        )}
      </div>
    </header>
  );
}
