import Link from "next/link";
import { TopBar } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <main className="page">
      <TopBar />
      <div className="panel">
        <h1 className="page-title">Nothing on the board here</h1>
        <p>That page doesn&apos;t exist, or the listing has expired.</p>
        <div>
          <Link href="/" className="btn btn-primary">
            Back to the board
          </Link>
        </div>
      </div>
    </main>
  );
}
