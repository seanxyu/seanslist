import { notFound } from "next/navigation";
import { connection } from "next/server";
import CategoryPage from "@/components/CategoryPage";
import { isCategory } from "@/lib/types";

export default async function CategoryRoute({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  // Render per request so card times stay current.
  await connection();

  return <CategoryPage category={category} />;
}
