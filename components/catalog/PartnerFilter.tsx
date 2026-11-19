"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Partner } from "@/lib/types/api";

interface PartnerFilterProps {
  partners: Partner[];
  activePartnerId?: string;
}

export default function PartnerFilter({
  partners,
  activePartnerId,
}: PartnerFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setPartner(partnerId?: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (!partnerId) {
      params.delete("partner_id");
    } else {
      params.set("partner_id", partnerId);
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
          Mitra:
        </span>

        <button
          type="button"
          onClick={() => setPartner(undefined)}
          className={`interactive press h-[30px] rounded-full px-3.5 text-[12px] font-semibold ${
            activePartnerId == null
              ? "bg-pillactive text-white"
              : "border border-borderline bg-pillsubtle text-textmain"
          }`}
        >
          Semua Mitra
        </button>

        {partners.map((partner) => (
          <button
            type="button"
            key={partner.partner_id}
            onClick={() => setPartner(partner.partner_id)}
            className={`interactive press inline-flex h-[30px] items-center rounded-full px-3.5 text-[12px] font-semibold ${
              activePartnerId === partner.partner_id
                ? "bg-pillactive text-white"
                : "border border-borderline bg-pillsubtle text-textmain"
            }`}
            title={[partner.category, partner.address, partner.description]
              .filter(Boolean)
              .join(" • ")}
          >
            {partner.name}
          </button>
        ))}
      </div>
    </div>
  );
}
