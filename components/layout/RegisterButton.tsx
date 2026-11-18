"use client";

import { useEffect, useState } from "react";

export default function RegisterButton() {
  const [showToast, setShowToast] = useState(false);
  const [isToastLeaving, setIsToastLeaving] = useState(false);

  useEffect(() => {
    if (!showToast) {
      return;
    }

    const leaveTimer = window.setTimeout(() => {
      setIsToastLeaving(true);
    }, 2600);

    const clearTimer = window.setTimeout(() => {
      setShowToast(false);
      setIsToastLeaving(false);
    }, 3000);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(clearTimer);
    };
  }, [showToast]);

  function handleOpenToast() {
    setIsToastLeaving(false);
    setShowToast(true);
  }

  return (
    <>
      {showToast ? (
        <div
          className={`fixed top-20 right-6 z-50 rounded-[8px] border border-primary/15 bg-surface px-4 py-3 text-[13px] font-semibold text-textmain shadow-sm ${
            isToastLeaving ? "toast-exit" : "toast-enter"
          }`}
        >
          Pendaftaran mitra segera hadir.
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleOpenToast}
        className="interactive press flex h-9 items-center justify-center rounded-[8px] border border-primary/15 bg-primary px-3.5 font-headline text-[12px] font-bold whitespace-nowrap text-white shadow-sm hover:bg-primary-hover"
      >
        Daftar
      </button>
    </>
  );
}
