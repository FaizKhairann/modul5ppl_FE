import CatalogSearch from "@/components/catalog/CatalogSearch";
import RegisterButton from "@/components/layout/RegisterButton";

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
          <div className="flex flex-col gap-0.5">
            <span className="font-headline text-[16px] leading-tight font-bold tracking-tight text-textmain">
              Araya System
            </span>
            <span className="text-[11px] leading-none text-textmuted">
              Universitas Pasundan
            </span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[480px]">
          <CatalogSearch initialQuery={initialQuery} />
        </div>

        {/* Keranjang + guest */}
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            aria-label="Keranjang Belanja"
            className="interactive press relative rounded-lg p-2 text-textmain hover:bg-pillsubtle"
          >
            <span className="material-symbols-outlined text-[22px]">
              shopping_cart
            </span>
          </button>

          <div className="h-6 w-px bg-borderline" />

          <div className="flex items-center gap-2.5">
            <div className="hidden items-center gap-2.5 rounded-[10px] border border-borderline bg-neutral-bg px-2.5 py-1.5 sm:flex">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pillsubtle text-textmuted">
                <span className="material-symbols-outlined text-[18px]">
                  person
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-headline text-[13px] leading-tight font-bold text-textmain">
                  Tamu #4821
                </span>
                <span className="text-[11px] leading-tight text-textmuted">
                  Mode Guest
                </span>
              </div>
            </div>

            <RegisterButton />
          </div>
        </div>
      </div>
    </header>
  );
}
