"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types/api";

const rupiahFormatter = new Intl.NumberFormat("id-ID");

interface ProductCardProps {
  product: Product;
  unitName: string;
}

export function ProductCard({ product, unitName }: ProductCardProps) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!detailOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDetailOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [detailOpen]);

  return (
    <>
      <article className="group flex flex-col justify-between rounded-[10px] border border-borderline bg-surface p-3 transition-all duration-150 hover:border-primary/40 hover:shadow-sm">
        <div>
          <div className="relative mb-2 flex h-[118px] w-full items-center justify-center overflow-hidden rounded-[6px] bg-neutral-bg">
            {/* shortcut: API belum punya field gambar produk, ganti ke image asli saat BE menambahkannya */}
            <div className="flex flex-col items-center gap-1.5 text-textmuted">
              <span className="material-symbols-outlined text-[24px]">image</span>
              <span className="text-[10px] font-medium">Gambar belum tersedia</span>
            </div>
          </div>

          <div className="mb-1">
            <span className="inline-block rounded-full bg-badgeblue px-2 py-[3px] font-headline text-[10px] leading-none font-bold text-primary">
              {unitName}
            </span>
          </div>

          <h2
            className="mb-1 min-h-[34px] line-clamp-2 font-headline text-[13px] leading-[17px] font-bold text-textmain"
            title={product.name}
          >
            {product.name}
          </h2>

          <div className="font-body text-[14px] font-bold text-primary">
            Rp {rupiahFormatter.format(product.price)}
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1.5 border-t border-borderline/40 pt-1.5">
          <button
            type="button"
            className="flex h-[30px] flex-1 items-center justify-center gap-1 rounded-[6px] bg-primary font-body text-[11px] font-bold whitespace-nowrap text-white transition-colors duration-150 hover:bg-[#162e5b]"
          >
            <span className="material-symbols-outlined text-[13px]">
              add_shopping_cart
            </span>
            <span>+ Keranjang</span>
          </button>

          <button
            type="button"
            onClick={() => setDetailOpen(true)}
            className="h-[30px] w-[60px] rounded-[6px] border border-border-subtle bg-transparent font-body text-[11px] font-semibold whitespace-nowrap text-textmain transition-colors duration-150 hover:bg-neutral-bg"
          >
            Detail
          </button>
        </div>
      </article>

      {detailOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-textmain/50 p-4 backdrop-blur-sm"
          onClick={() => setDetailOpen(false)}
        >
          <div
            className="relative w-full max-w-[560px] rounded-xl border border-borderline/60 bg-surface p-[18px] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3.5 flex items-center justify-between">
              <span className="inline-block rounded-full bg-badgeblue px-2.5 py-[3px] font-headline text-[10px] leading-none font-bold text-primary">
                {unitName}
              </span>
              <button
                type="button"
                aria-label="Tutup dialog"
                onClick={() => setDetailOpen(false)}
                className="flex items-center justify-center rounded-lg p-1 text-textmuted transition-colors hover:bg-slate-100 hover:text-textmain"
              >
                <span className="material-symbols-outlined text-[17px]">
                  close
                </span>
              </button>
            </div>

            <div className="mb-4.5 flex flex-col items-start gap-3.5 sm:flex-row">
              <div className="flex h-[170px] w-full shrink-0 flex-col items-center justify-center rounded-[8px] border border-slate-200 bg-pillsubtle text-slate-400 sm:w-[170px]">
                <span className="material-symbols-outlined mb-1.5 text-[38px] text-border-subtle">
                  image
                </span>
                <span className="text-[11px] font-medium text-border-subtle">
                  Pratinjau Produk
                </span>
              </div>

              <div className="flex w-full flex-1 flex-col gap-2">
                <h2 className="font-headline text-[17px] leading-snug font-bold text-textmain">
                  {product.name}
                </h2>

                <div className="flex items-center gap-2">
                  <div className="font-body text-[15px] font-bold text-primary">
                    Rp {rupiahFormatter.format(product.price)}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Tersedia
                  </span>
                </div>

                <p className="text-[11px] leading-relaxed text-textmuted">
                  {product.description}
                </p>

                <div className="grid grid-cols-2 gap-x-3 gap-y-1 rounded-[6px] border border-slate-200 bg-neutral-bg p-2 text-[10px]">
                  <div>
                    <span className="text-border-subtle">Kategori:</span>{" "}
                    <span className="font-semibold text-textmain">
                      {product.category}
                    </span>
                  </div>
                  <div>
                    <span className="text-border-subtle">ID Produk:</span>{" "}
                    <span className="font-semibold text-textmain">
                      #{product.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-border-subtle">Unit:</span>{" "}
                    <span className="font-semibold text-textmain">
                      {unitName}
                    </span>
                  </div>
                  <div>
                    <span className="text-border-subtle">Status:</span>{" "}
                    <span className="font-semibold text-textmain">
                      {product.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
              <div className="flex h-[30px] w-[90px] items-center justify-between rounded-[6px] border border-border-subtle bg-white px-2 text-[12px] font-semibold text-textmain">
                <button
                  type="button"
                  onClick={() => setQty((current) => Math.max(1, current - 1))}
                  className="flex h-5 w-5 select-none items-center justify-center text-[14px] font-bold text-textmuted transition-colors hover:text-textmain"
                >
                  -
                </button>
                <span className="select-none text-[12px] font-bold">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((current) => current + 1)}
                  className="flex h-5 w-5 select-none items-center justify-center text-[14px] font-bold text-textmuted transition-colors hover:text-textmain"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="flex h-8 items-center gap-1.5 rounded-[6px] bg-primary px-4 text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-[#162e5b]"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    add_shopping_cart
                  </span>
                  + Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
