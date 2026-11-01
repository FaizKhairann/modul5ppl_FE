import EmptyState from "@/components/catalog/EmptyState";
import { ProductCard } from "@/components/catalog/ProductCard";
import Pagination from "@/components/catalog/Pagination";
import ServiceRequestLauncher from "@/components/catalog/ServiceRequestLauncher";
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
  const totalPages = productList.meta?.total_pages ?? 1;

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] px-4 pt-[80px] pb-12 sm:px-6 xl:px-8">
        <section className="mb-6">
          <div className="rounded-[10px] border border-borderline bg-surface p-[18px] sm:p-5">
            <div className="flex flex-col justify-between gap-2.5 md:flex-row md:items-center">
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

                <h1 className="font-headline text-[22px] leading-snug font-bold text-textmain sm:text-[24px]">
                  Katalog Produk & Jasa BPU
                </h1>

                <p className="mt-0.5 text-[13px] text-textmuted sm:text-[14px]">
                  Jelajahi layanan dan produk resmi dari unit usaha BPU
                  Universitas Pasundan.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <div className="flex items-center gap-3 rounded-lg border border-borderline bg-neutral-bg px-3 py-1.5 sm:px-3.5 sm:py-2">
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

            <div className="mt-3 text-[12px] text-textmuted sm:text-[13px]">
              Menampilkan katalog dari {businessUnits.length} unit usaha aktif.
            </div>
          </div>
        </section>

        {isEmpty ? (
          <div className="min-h-[440px]">
            <EmptyState />
          </div>
        ) : (
          <>
            <section className="grid min-h-[320px] grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              totalPages={totalPages}
            />
          </>
        )}

        <footer className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-borderline pt-6 text-[12px] text-textmuted sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Sistem Operasional Berjalan Normal • v2.4.0 ERP Core</span>
          </div>
          <div>© 2026 Badan Pengelola Usaha (BPU) Universitas Pasundan • Sistem Katalog Terpadu</div>
        </footer>

        <ServiceRequestLauncher businessUnits={businessUnits} />
      </main>
    </>
  );
}
