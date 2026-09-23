import { notFound } from "next/navigation";
import { connection } from "next/server";
import CategoryPage from "@/components/CategoryPage";
import { isCategory, subcategoryFromSlug } from "@/lib/types";

export default async function SubcategoryRoute({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory: slug } = await params;
  if (!isCategory(category)) notFound();
  const subcategory = subcategoryFromSlug(category, slug);
  if (!subcategory) notFound();

  // Render per request so card times stay current.
  await connection();

  return <CategoryPage category={category} subcategory={subcategory} />;
}
