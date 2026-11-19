"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { BusinessUnit } from "@/lib/types/api";

interface UnitFilterProps {
  businessUnits: BusinessUnit[];
  activeUnitId?: number;
}

export default function UnitFilter({
  businessUnits,
  activeUnitId,
}: UnitFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setUnit(unitId?: number) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (unitId == null) {
      params.delete("unit_usaha_id");
    } else {
      params.set("unit_usaha_id", String(unitId));
    }

    params.delete("page");

    const query = params.toString();
    const href = query ? `/?${query}` : "/";
    router.push(href);
  }

  return (
    <div className="mt-3.5 border-t border-borderline/60 pt-3.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[12px] font-semibold tracking-wider text-textmuted uppercase">
          Unit:
        </span>

        <button
          type="button"
          onClick={() => setUnit(undefined)}
          className={`interactive press h-[30px] rounded-full px-3.5 text-[12px] font-semibold ${
            activeUnitId == null
              ? "bg-pillactive text-white"
              : "border border-borderline bg-pillsubtle text-textmain"
          }`}
        >
          Semua Unit
        </button>

        {businessUnits.map((unit) => (
          <button
            type="button"
            key={unit.id}
            onClick={() => setUnit(unit.id)}
            className={`interactive press inline-flex h-[30px] items-center rounded-full px-3.5 text-[12px] font-semibold ${
              activeUnitId === unit.id
                ? "bg-pillactive text-white"
                : "border border-borderline bg-pillsubtle text-textmain"
            }`}
            title={[unit.category, unit.division, unit.description]
              .filter(Boolean)
              .join(" • ")}
          >
            {unit.name}
          </button>
        ))}
      </div>
    </div>
  );
}
