"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface CategoryFilterProps {
  categories: string[];
  activeCategory?: string;
}

function getCategoryLabel(category: string) {
  switch (category.toUpperCase()) {
    case "PRODUCT":
      return "Produk";
    case "SERVICE":
      return "Jasa";
    default:
      return category;
  }
}

export default function CategoryFilter({
  categories,
  activeCategory,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setCategory(category?: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (!category) {
      params.delete("category");
      params.delete("page");
    } else {
      params.set("category", category);
      params.set("page", "1");
    }

    const query = params.toString();
    const href = query ? `/?${query}` : "/";
    router.push(href);
  }

  return (
    <div className="mt-3.5 border-t border-borderline/60 pt-3.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[12px] font-semibold tracking-wider text-textmuted uppercase">
          Kategori:
        </span>

        <button
          type="button"
          onClick={() => setCategory(undefined)}
          className={`h-[30px] rounded-full px-3.5 text-[12px] font-semibold transition-all duration-150 ${
            activeCategory == null
              ? "bg-pillactive text-white"
              : "border border-borderline bg-pillsubtle text-textmain"
          }`}
        >
          Semua Kategori
        </button>

        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setCategory(category)}
            className={`h-[30px] rounded-full px-3.5 text-[12px] font-semibold transition-all duration-150 ${
              activeCategory?.toLowerCase() === category.toLowerCase()
                ? "bg-pillactive text-white"
                : "border border-borderline bg-pillsubtle text-textmain"
            }`}
          >
            {getCategoryLabel(category)}
          </button>
        ))}
      </div>
    </div>
  );
}
