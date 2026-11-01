"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { BusinessUnit } from "@/lib/types/api";

interface UnitFilterProps {
  businessUnits: BusinessUnit[];
  activeUnitId?: number;
}

export default function UnitFilter({ businessUnits, activeUnitId }: UnitFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setUnit(unitId?: number) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (unitId == null) {
      params.delete("unit_usaha_id");
      params.delete("page");
    } else {
      params.set("unit_usaha_id", String(unitId));
      params.set("page", "1");
    }
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
        onClick={() => setUnit(undefined)}
        className={`h-[30px] px-3.5 rounded-full text-[12px] font-semibold transition-all duration-150 ${
          activeUnitId == null ? "bg-pillactive text-white" : "bg-pillsubtle text-textmain border border-borderline"
        }`}
      >
        Semua Unit
      </button>

      {businessUnits.map((unit) => (
        <button
          key={unit.id}
          onClick={() => setUnit(unit.id)}
          className={`h-[30px] px-3.5 rounded-full text-[12px] font-semibold transition-all duration-150 ${
            activeUnitId === unit.id ? "bg-pillactive text-white" : "bg-pillsubtle text-textmain border border-borderline"
          }`}
        >
          {unit.name}
        </button>
      ))}
      </div>
    </div>
  );
}
