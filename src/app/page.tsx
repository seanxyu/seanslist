import { connection } from "next/server";
import CategoryChips from "@/components/CategoryChips";
import ListingGrid from "@/components/ListingGrid";
import { Masthead } from "@/components/SiteHeader";
import { getAllListings } from "@/lib/data";

export default async function HomePage() {
  // Render per request so card times ("9:45 AM") stay current.
  await connection();

  return (
    <main className="page">
      <Masthead />
      <CategoryChips />
      <h1 className="visually-hidden">Newest listings in San Francisco</h1>
      <ListingGrid listings={getAllListings()} />
    </main>
  );
}
