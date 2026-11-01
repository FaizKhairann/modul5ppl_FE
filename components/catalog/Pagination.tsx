"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export default function Pagination({
  page,
  perPage,
  totalItems,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const startItem = totalItems === 0 ? 0 : (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, totalItems);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  function goToPage(nextPage: number) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", String(nextPage));
    const href = `/?${params.toString()}`;
    router.push(href);
  }

  return (
    <nav
      aria-label="Navigasi Halaman"
      className="mt-5 flex flex-col items-center justify-between gap-3 rounded-[10px] border border-borderline bg-surface p-2.5 px-3.5 sm:flex-row"
    >
      <div className="text-[13px] text-textmuted">
        Menampilkan <span className="font-semibold text-textmain">{startItem}-{endItem}</span> dari <span className="font-semibold text-textmain">{totalItems}</span> produk
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Halaman Sebelumnya"
          disabled={page === 1}
          onClick={() => goToPage(page - 1)}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-borderline bg-surface text-textmain transition-colors duration-150 hover:bg-neutral-bg disabled:cursor-not-allowed disabled:bg-pillsubtle disabled:text-border-subtle disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>

        {pages.map((pageNumber) => {
          const isActive = pageNumber === page;

          return (
            <button
              key={pageNumber}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => goToPage(pageNumber)}
              className={
                isActive
                  ? "flex h-[30px] w-[30px] items-center justify-center rounded-[6px] bg-primary font-headline text-[12px] font-bold text-white shadow-sm"
                  : "flex h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-borderline bg-surface font-body text-[12px] font-medium text-textmain transition-colors duration-150 hover:bg-neutral-bg hover:border-primary"
              }
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          type="button"
          aria-label="Halaman Selanjutnya"
          disabled={page === totalPages}
          onClick={() => goToPage(page + 1)}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-borderline bg-surface text-textmain transition-colors duration-150 hover:bg-neutral-bg disabled:cursor-not-allowed disabled:bg-pillsubtle disabled:text-border-subtle disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
    </nav>
  );
}
