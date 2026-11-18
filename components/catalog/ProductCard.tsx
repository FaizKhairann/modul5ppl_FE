"use client";

import { useEffect, useState } from "react";
import { useServiceRequest } from "@/components/catalog/ServiceRequestProvider";
import type { Product } from "@/lib/types/api";

const rupiahFormatter = new Intl.NumberFormat("id-ID");

function formatPrice(price: Product["price"]) {
  return `Rp ${rupiahFormatter.format(Number(price))}`;
}

function getTypeLabel(type: Product["type"]) {
  return type === "SERVICE" ? "Jasa" : "Produk";
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { openRequest } = useServiceRequest();
  const [detailOpen, setDetailOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const typeLabel = getTypeLabel(product.type);
  const isService = product.type === "SERVICE";

  function openServiceForm() {
    setDetailOpen(false);
    openRequest({ serviceId: product.id, title: product.name });
  }

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
      <article className="lift group flex flex-col justify-between rounded-[10px] border border-borderline bg-surface p-3 hover:border-primary/40">
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
              {typeLabel}
            </span>
          </div>

          <h2
            className="mb-1 min-h-[34px] line-clamp-2 font-headline text-[13px] leading-[17px] font-bold text-textmain"
            title={product.name}
          >
            {product.name}
          </h2>

          <div className="font-body text-[14px] font-bold text-primary">
            {formatPrice(product.price)}
          </div>

          <p className="mt-1 text-[11px] text-textmuted">
            {isService ? `${product.unit} • Layanan` : `${product.unit} • Stok ${product.stock}`}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-1.5 border-t border-borderline/40 pt-1.5">
          <button
            type="button"
            onClick={isService ? openServiceForm : undefined}
            className="interactive press flex h-[30px] flex-1 items-center justify-center gap-1 rounded-[6px] bg-primary font-body text-[11px] font-bold whitespace-nowrap text-white hover:bg-primary-hover"
          >
            <span className="material-symbols-outlined text-[13px]">
              {isService ? "forum" : "add_shopping_cart"}
            </span>
            <span>{isService ? "Hubungi" : "+ Keranjang"}</span>
          </button>

          <button
            type="button"
            onClick={() => setDetailOpen(true)}
            className="interactive press h-[30px] w-[60px] rounded-[6px] border border-border-subtle bg-transparent font-body text-[11px] font-semibold whitespace-nowrap text-textmain hover:bg-neutral-bg"
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
                {typeLabel}
              </span>
              <button
                type="button"
                aria-label="Tutup dialog"
                onClick={() => setDetailOpen(false)}
                className="interactive press flex items-center justify-center rounded-lg p-1 text-textmuted hover:bg-slate-100 hover:text-textmain"
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
                    {formatPrice(product.price)}
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
                      {typeLabel}
                    </span>
                  </div>
                  <div>
                    <span className="text-border-subtle">SKU:</span>{" "}
                    <span className="font-semibold text-textmain">
                      {product.sku}
                    </span>
                  </div>
                  <div>
                    <span className="text-border-subtle">Satuan:</span>{" "}
                    <span className="font-semibold text-textmain">
                      {product.unit}
                    </span>
                  </div>
                  <div>
                    <span className="text-border-subtle">Status:</span>{" "}
                    <span className="font-semibold text-textmain">
                      {product.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                  <div>
                    <span className="text-border-subtle">Stok:</span>{" "}
                    <span className="font-semibold text-textmain">
                      {isService ? "Layanan" : product.stock}
                    </span>
                  </div>
                  <div>
                    <span className="text-border-subtle">Pajak:</span>{" "}
                    <span className="font-semibold text-textmain">
                      {product.tax_rates?.name ?? "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
              {isService ? (
                <button
                  type="button"
                  onClick={openServiceForm}
                  className="interactive press flex h-8 w-full items-center justify-center gap-1.5 rounded-[6px] bg-primary px-4 text-[12px] font-bold text-white shadow-sm hover:bg-primary-hover"
                >
                  <span className="material-symbols-outlined text-[15px]">forum</span>
                  Hubungi
                </button>
              ) : (
                <>
                  <div className="flex h-[30px] w-[90px] items-center justify-between rounded-[6px] border border-border-subtle bg-white px-2 text-[12px] font-semibold text-textmain">
                    <button
                      type="button"
                      onClick={() => setQty((current) => Math.max(1, current - 1))}
                      className="interactive flex h-5 w-5 select-none items-center justify-center text-[14px] font-bold text-textmuted hover:text-textmain"
                    >
                      -
                    </button>
                    <span className="select-none text-[12px] font-bold">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty((current) => current + 1)}
                      className="interactive flex h-5 w-5 select-none items-center justify-center text-[14px] font-bold text-textmuted hover:text-textmain"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="interactive press flex h-8 items-center gap-1.5 rounded-[6px] bg-primary px-4 text-[12px] font-bold text-white shadow-sm hover:bg-primary-hover"
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        add_shopping_cart
                      </span>
                      + Keranjang
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
