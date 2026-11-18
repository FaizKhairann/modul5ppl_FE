"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface CatalogSearchProps {
  initialQuery?: string;
}

export default function CatalogSearch({ initialQuery = "" }: CatalogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const lastPushedQueryRef = useRef(initialQuery);

  useEffect(() => {
    const currentQuery = searchParams.get("q") ?? "";

    if (currentQuery === lastPushedQueryRef.current) {
      return;
    }

    lastPushedQueryRef.current = currentQuery;
    setQuery(currentQuery);
  }, [searchParams]);

  function commitQuery(nextQuery: string) {
    const normalizedQuery = nextQuery.trim();
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (normalizedQuery) {
      params.set("q", normalizedQuery);
    } else {
      params.delete("q");
    }

    params.delete("page");

    const href = params.toString() ? `/?${params.toString()}` : "/";
    lastPushedQueryRef.current = normalizedQuery;

    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const currentQuery = searchParams.get("q") ?? "";
      const normalizedQuery = query.trim();

      if (normalizedQuery === currentQuery.trim()) {
        return;
      }

      const params = new URLSearchParams(Array.from(searchParams.entries()));

      if (normalizedQuery) {
        params.set("q", normalizedQuery);
      } else {
        params.delete("q");
      }

      params.delete("page");

      const href = params.toString() ? `/?${params.toString()}` : "/";
      lastPushedQueryRef.current = normalizedQuery;

      startTransition(() => {
        router.replace(href, { scroll: false });
      });
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [query, router, searchParams]);

  return (
    <form
      className="relative flex w-full items-center"
      onSubmit={(event) => {
        event.preventDefault();
        commitQuery(query);
      }}
      role="search"
    >
      <span
        className={`material-symbols-outlined pointer-events-none absolute left-3 text-[19px] transition-opacity ${
          isPending ? "opacity-60" : "opacity-100"
        } text-textmuted`}
      >
        search
      </span>

      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Cari produk atau unit usaha..."
        aria-label="Cari produk atau unit usaha"
        className="interactive h-10 w-full rounded-[6px] border border-border-subtle bg-surface pr-10 pl-9 text-[14px] text-textmain placeholder-textmuted focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
      />

      {query ? (
        <button
          type="button"
          aria-label="Hapus pencarian"
          onClick={() => setQuery("")}
          className="interactive press absolute right-2 flex h-7 w-7 items-center justify-center rounded-full text-textmuted hover:bg-neutral-bg hover:text-textmain"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      ) : null}
    </form>
  );
}
