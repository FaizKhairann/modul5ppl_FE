import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = "Produk tidak ditemukan",
  description = "Tidak ada produk yang cocok dengan filter saat ini. Coba pilih unit lain atau tampilkan semua produk.",
}: EmptyStateProps) {
  return (
    <section
      role="status"
      aria-live="polite"
      className="mt-6 rounded-[10px] border border-borderline bg-surface p-6 text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-badgeblue text-primary">
        <span className="material-symbols-outlined text-[32px]">inventory_2</span>
      </div>

      <h2 className="mt-4 font-headline text-[22px] leading-snug font-bold text-textmain">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-[520px] text-[14px] leading-6 text-textmuted">
        {description}
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-[6px] bg-primary px-5 font-body text-[14px] font-bold text-white transition-colors duration-150 hover:bg-[#162e5b]"
        >
          Tampilkan Semua Unit
        </Link>
      </div>
    </section>
  );
}
