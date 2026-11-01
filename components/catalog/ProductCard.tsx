import type { Product } from "@/lib/types/api";

const rupiahFormatter = new Intl.NumberFormat("id-ID");

interface ProductCardProps {
  product: Product;
  unitName: string;
}

export function ProductCard({ product, unitName }: ProductCardProps) {
  return (
    <article className="group flex flex-col justify-between rounded-[10px] border border-borderline bg-surface p-4 transition-all duration-150 hover:border-primary/40 hover:shadow-sm">
      <div>
        <div className="relative mb-3 flex h-[140px] w-full items-center justify-center overflow-hidden rounded-[6px] bg-neutral-bg">
          {/* shortcut: API belum punya field gambar produk, ganti ke image asli saat BE menambahkannya */}
          <div className="flex flex-col items-center gap-2 text-textmuted">
            <span className="material-symbols-outlined text-[28px]">image</span>
            <span className="text-[12px] font-medium">Gambar belum tersedia</span>
          </div>
        </div>

        <div className="mb-2">
          <span className="inline-block rounded-full bg-badgeblue px-2.5 py-1 font-headline text-[12px] leading-none font-bold text-primary">
            {unitName}
          </span>
        </div>

        <h2
          className="mb-2 min-h-[40px] line-clamp-2 font-headline text-[15px] leading-[20px] font-bold text-textmain"
          title={product.name}
        >
          {product.name}
        </h2>

        <div className="font-body text-[16px] font-bold text-primary">
          Rp {rupiahFormatter.format(product.price)}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-borderline/40 pt-2">
        <button
          type="button"
          className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-[6px] bg-primary font-body text-[13px] font-bold whitespace-nowrap text-white transition-colors duration-150 hover:bg-[#162e5b]"
        >
          <span className="material-symbols-outlined text-[17px]">
            add_shopping_cart
          </span>
          <span>+ Keranjang</span>
        </button>

        <button
          type="button"
          className="h-9 w-[70px] rounded-[6px] border border-border-subtle bg-transparent font-body text-[13px] font-semibold whitespace-nowrap text-textmain transition-colors duration-150 hover:bg-neutral-bg"
        >
          Detail
        </button>
      </div>
    </article>
  );
}
