import { ProductCard } from "@/components/catalog/ProductCard";
import UnitFilter from "@/components/catalog/UnitFilter";
import { Navbar } from "@/components/layout/Navbar";
import { getBusinessUnits, getProducts } from "@/lib/api/catalog";

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: Props) {
  const unitParam = Array.isArray(searchParams?.unit_usaha_id)
    ? searchParams?.unit_usaha_id[0]
    : searchParams?.unit_usaha_id;

  const pageParam = Array.isArray(searchParams?.page)
    ? searchParams?.page[0]
    : searchParams?.page;

  const unitId = unitParam ? Number(unitParam) : undefined;
  const page = pageParam ? Number(pageParam) : 1;

  const [businessUnits, productList] = await Promise.all([
    getBusinessUnits(),
    getProducts({ per_page: 12, unit_usaha_id: unitId, page }),
  ]);

  const totalProducts = productList.meta?.total ?? productList.products.length;
  const unitById = new Map(businessUnits.map((unit) => [unit.id, unit.name]));

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

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productList.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              unitName={unitById.get(product.unit_usaha_id) ?? "Unit Usaha BPU"}
            />
          ))}
        </section>
      </main>
    </>
  );
}
