export function Navbar() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 h-14 border-b border-borderline bg-surface">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-6">
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

        {/* Search (statis untuk sekarang) */}
        <div className="mx-auto w-full max-w-[480px]">
          <div className="relative flex w-full items-center">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[19px] text-textmuted">
              search
            </span>
            <input
              type="text"
              placeholder="Cari produk atau unit usaha..."
              className="h-10 w-full rounded-[6px] border border-border-subtle bg-surface pr-4 pl-9 text-[14px] text-textmain placeholder-textmuted transition-all duration-150 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />

            <div className="pointer-events-none absolute right-2.5 rounded border border-borderline bg-pillsubtle px-1.5 py-0.5 text-[11px] font-medium text-textmuted">
              ⌘K
            </div>
          </div>
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
