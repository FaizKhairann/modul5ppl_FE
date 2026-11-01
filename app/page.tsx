import EmptyState from "@/components/catalog/EmptyState";
import { ProductCard } from "@/components/catalog/ProductCard";
import Pagination from "@/components/catalog/Pagination";
import UnitFilter from "@/components/catalog/UnitFilter";
import { Navbar } from "@/components/layout/Navbar";
import { getBusinessUnits, getProducts } from "@/lib/api/catalog";

const PRODUCTS_PER_PAGE = 8;

interface Props {
  searchParams?:
    | { [key: string]: string | string[] | undefined }
    | Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams =
    searchParams && typeof searchParams === "object" && "then" in searchParams
      ? await searchParams
      : (searchParams ?? {});

  const unitParam = Array.isArray(resolvedSearchParams.unit_usaha_id)
    ? resolvedSearchParams.unit_usaha_id[0]
    : resolvedSearchParams.unit_usaha_id;

  const pageParam = Array.isArray(resolvedSearchParams.page)
    ? resolvedSearchParams.page[0]
    : resolvedSearchParams.page;

  const unitId = unitParam ? Number(unitParam) : undefined;
  const page = pageParam ? Number(pageParam) : 1;

  const [businessUnits, productList] = await Promise.all([
    getBusinessUnits(),
    // shortcut: pakai 8 item per halaman agar sesuai prototype UI/UX saat ini.
    getProducts({ per_page: PRODUCTS_PER_PAGE, unit_usaha_id: unitId, page }),
  ]);

  const products = Array.isArray(productList.products) ? productList.products : [];
  const totalProducts = productList.meta?.total ?? products.length;
  const unitById = new Map(businessUnits.map((unit) => [unit.id, unit.name]));
  const isEmpty = products.length === 0;

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-[1280px] px-6 pt-20 pb-12">
        <section className="mb-6">
          <div className="rounded-[10px] border border-borderline bg-surface p-5">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-badgeblue px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    Portal Resmi ERP BPU
                  </span>
                  <span className="text-[12px] text-textmuted">•</span>
                  <span className="text-[12px] text-textmuted">
                    Katalog Komersial Unit Usaha Terpadu
                  </span>
                </div>

                <h1 className="font-headline text-[24px] leading-snug font-bold text-textmain">
                  Katalog Produk & Jasa BPU
                </h1>

                <p className="mt-0.5 text-[14px] text-textmuted">
                  Jelajahi layanan dan produk resmi dari unit usaha BPU
                  Universitas Pasundan.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <div className="flex items-center gap-3 rounded-lg border border-borderline bg-neutral-bg px-3.5 py-2">
                  <div className="text-left">
                    <div className="text-[11px] font-medium tracking-wider text-textmuted uppercase">
                      Total Item Aktif
                    </div>
                    <div className="font-headline text-[18px] leading-tight font-bold text-textmain">
                      {totalProducts} Komoditas
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[26px] text-primary">
                    inventory_2
                  </span>
                </div>
              </div>
            </div>

            <UnitFilter businessUnits={businessUnits} activeUnitId={unitId} />

            <div className="mt-4 border-t border-borderline/60 pt-4 text-[13px] text-textmuted">
              Menampilkan katalog dari {businessUnits.length} unit usaha aktif.
            </div>
          </div>
        </section>

        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  unitName={unitById.get(product.unit_usaha_id) ?? "Unit Usaha BPU"}
                />
              ))}
            </section>

            <Pagination
              page={page}
              perPage={PRODUCTS_PER_PAGE}
              totalItems={totalProducts}
              totalPages={productList.meta?.total_pages ?? 1}
            />
          </>
        )}
      </main>
    </>
  );
}
