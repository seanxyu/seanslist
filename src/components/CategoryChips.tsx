import Link from "next/link";
import { countListings } from "@/lib/data";
import { CATEGORY_LABELS, type Category } from "@/lib/types";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

// "everything · for sale 3 · jobs 2 …" — the top-level category rail.
// `hrefFor` lets search results keep the query while switching category.
export default function CategoryChips({
  active,
  hrefFor = (category) => (category ? `/${category}` : "/"),
}: {
  active?: Category;
  hrefFor?: (category?: Category) => string;
}) {
  const chips: { key: string; label: string; count: number; category?: Category }[] = [
    { key: "all", label: "everything", count: countListings() },
    ...CATEGORIES.map((category) => ({
      key: category,
      label: CATEGORY_LABELS[category],
      count: countListings(category),
      category,
    })),
  ];

  return (
    <nav aria-label="Categories">
      <ul className="chips">
        {chips.map((chip) => (
          <li key={chip.key}>
            <Link
              href={hrefFor(chip.category)}
              className="chip"
              aria-current={chip.category === active ? "page" : undefined}
            >
              {chip.label}
              <span className="count">{chip.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
