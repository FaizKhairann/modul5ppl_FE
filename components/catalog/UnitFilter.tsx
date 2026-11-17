import type { BusinessUnit } from "@/lib/types/api";

interface UnitFilterProps {
  businessUnits: BusinessUnit[];
}

export default function UnitFilter({ businessUnits }: UnitFilterProps) {
  return (
    <div className="mt-3.5 border-t border-borderline/60 pt-3.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[12px] font-semibold tracking-wider text-textmuted uppercase">
          Unit:
        </span>

        {businessUnits.map((unit) => (
          <span
            key={unit.id}
            className="inline-flex h-[30px] items-center rounded-full border border-borderline bg-pillsubtle px-3.5 text-[12px] font-semibold text-textmain"
            title={unit.category}
          >
            {unit.name}
          </span>
        ))}
      </div>
    </div>
  );
}
