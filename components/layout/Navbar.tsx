import CatalogSearch from "@/components/catalog/CatalogSearch";

interface NavbarProps {
  initialQuery?: string;
}

export function Navbar({ initialQuery }: NavbarProps) {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-14 border-b border-borderline bg-surface">
      <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
        {/* Logo + judul */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white shadow-sm">
            <span className="material-symbols-outlined text-[20px]">
              account_balance
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-[16px] leading-tight font-bold tracking-tight text-textmain">
              BPU System
            </span>
            <span className="text-[11px] leading-none text-textmuted">
              Universitas Pasundan
            </span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[480px]">
          <CatalogSearch initialQuery={initialQuery} />
        </div>

        {/* Keranjang + profil */}
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            aria-label="Keranjang Belanja"
            className="relative rounded-lg p-2 text-textmain transition-colors duration-150 hover:bg-pillsubtle"
          >
            <span className="material-symbols-outlined text-[22px]">
              shopping_cart
            </span>
          </button>

          <div className="h-6 w-px bg-borderline" />

          <div className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-90">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-white ring-2 ring-badgeblue">
              AD
            </div>
            <div className="hidden flex-col text-left sm:flex">
              <span className="font-headline text-[13px] leading-tight font-semibold text-textmain">
                Admin BPU
              </span>
              <span className="text-[11px] leading-none text-textmuted">
                Pengelola Kampus
              </span>
            </div>
            <span className="material-symbols-outlined text-[18px] text-textmuted">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
