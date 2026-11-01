"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { createServiceRequest } from "@/lib/api/service-requests";
import type { BusinessUnit, CreateServiceRequest } from "@/lib/types/api";

interface ServiceRequestLauncherProps {
  businessUnits: BusinessUnit[];
}

interface FormValues {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  unit_usaha_id: string;
  title: string;
  description: string;
}

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  unit_usaha_id: "",
  title: "",
  description: "",
};

export default function ServiceRequestLauncher({
  businessUnits,
}: ServiceRequestLauncherProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isToastLeaving, setIsToastLeaving] = useState(false);
  const [values, setValues] = useState<FormValues>({
    ...initialValues,
    unit_usaha_id: businessUnits[0] ? String(businessUnits[0].id) : "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const formTitleId = useId();

  const defaultUnitId = useMemo(
    () => (businessUnits[0] ? String(businessUnits[0].id) : ""),
    [businessUnits],
  );

  function closeModal() {
    setOpen(false);
    setIsSubmitting(false);
    setErrors({});
    setGeneralError(null);
  }

  function resetForm() {
    setValues({ ...initialValues, unit_usaha_id: defaultUnitId });
    setErrors({});
    setGeneralError(null);
  }

  function openModal() {
    if (!open) {
      resetForm();
      setSubmitMessage(null);
      setIsToastLeaving(false);
    }

    setOpen(true);
  }

  function validateForm(currentValues: FormValues): FieldErrors {
    const nextErrors: FieldErrors = {};

    if (!currentValues.customer_name.trim()) {
      nextErrors.customer_name = "Nama pemohon wajib diisi.";
    }

    if (!currentValues.customer_email.trim()) {
      nextErrors.customer_email = "Email aktif / kampus wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValues.customer_email)) {
      nextErrors.customer_email = "Format email belum valid.";
    }

    if (!currentValues.customer_phone.trim()) {
      nextErrors.customer_phone = "Nomor WhatsApp wajib diisi.";
    }

    if (!currentValues.unit_usaha_id) {
      nextErrors.unit_usaha_id = "Unit usaha wajib dipilih.";
    }

    if (!currentValues.title.trim()) {
      nextErrors.title = "Judul permintaan wajib diisi.";
    }

    if (!currentValues.description.trim()) {
      nextErrors.description = "Detail permintaan wajib diisi.";
    }

    return nextErrors;
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setGeneralError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setGeneralError(null);
    setSubmitMessage(null);

    const payload: CreateServiceRequest = {
      unit_usaha_id: Number(values.unit_usaha_id),
      customer_name: values.customer_name.trim(),
      customer_email: values.customer_email.trim(),
      customer_phone: values.customer_phone.trim(),
      title: values.title.trim(),
      description: values.description.trim(),
    };

    try {
      await createServiceRequest(payload);
      setSubmitMessage("Permintaan berhasil dikirim.");
      resetForm();
      setOpen(false);
    } catch (error) {
      const apiError = error as { message?: string; fields?: Record<string, string> };

      setGeneralError(apiError.message ?? "Gagal mengirim permintaan.");

      if (apiError.fields) {
        setErrors((current) => ({
          ...current,
          customer_name: apiError.fields?.customer_name,
          customer_email: apiError.fields?.customer_email,
          customer_phone: apiError.fields?.customer_phone,
          unit_usaha_id: apiError.fields?.unit_usaha_id,
          title: apiError.fields?.title,
          description: apiError.fields?.description,
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!submitMessage) {
      return;
    }

    const leaveTimer = window.setTimeout(() => {
      setIsToastLeaving(true);
    }, 2600);

    const clearTimer = window.setTimeout(() => {
      setSubmitMessage(null);
      setIsToastLeaving(false);
    }, 3000);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(clearTimer);
    };
  }, [submitMessage]);

  return (
    <>
      {submitMessage ? (
        <div
          className={`fixed top-20 right-6 z-50 rounded-[8px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] font-semibold text-emerald-700 shadow-sm ${
            isToastLeaving ? "toast-exit" : "toast-enter"
          }`}
        >
          {submitMessage}
        </div>
      ) : null}

      <button
        type="button"
        aria-label="Bantuan BPU"
        onClick={openModal}
        className="fixed right-6 bottom-6 z-40 flex h-12 cursor-pointer items-center gap-2 rounded-full bg-primary px-5 text-white shadow-[0_8px_24px_rgba(15,23,42,0.25)] transition-all hover:bg-[#17305E] active:scale-[0.98]"
      >
        <span className="material-symbols-outlined text-[18px] text-white">
          forum
        </span>
        <span className="font-body text-[14px] font-bold tracking-normal text-white">
          Hubungi
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[520px] overflow-hidden rounded-[10px] border border-borderline bg-surface shadow-2xl [box-shadow:0_6px_20px_rgba(15,23,42,0.12)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-borderline px-6 pt-[20px] pb-4">
              <div>
                <h2 className="font-headline text-[20px] leading-snug font-bold text-textmain">
                  Form Permintaan Layanan
                </h2>
                <p className="mt-1 text-sm text-textmuted">
                  Hubungi unit usaha BPU langsung untuk pengajuan layanan
                  khusus.
                </p>
              </div>

              <button
                type="button"
                aria-label="Tutup dialog"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-md p-1.5 text-textmuted transition-colors hover:bg-pillsubtle hover:text-textmain"
              >
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </button>
            </div>

            <form className="space-y-4 p-6 font-body" onSubmit={handleSubmit}>
              {generalError ? (
                <div className="rounded-[6px] border border-rose-200 bg-rose-50 px-3 py-2 text-[12px] font-medium text-rose-700">
                  {generalError}
                </div>
              ) : null}

              <div>
                <label htmlFor={`${formTitleId}-customer-name`} className="mb-1.5 block text-sm font-bold text-textmain">
                  Nama Pemohon <span className="font-bold text-rose-500">*</span>
                </label>
                <input
                  id={`${formTitleId}-customer-name`}
                  name="customer_name"
                  type="text"
                  placeholder="Masukkan nama pemohon"
                  value={values.customer_name}
                  onChange={handleChange}
                  className={`h-10 w-full rounded-[6px] bg-white px-3 text-sm text-textmain transition-all focus:outline-none ${
                    errors.customer_name
                      ? "border border-rose-600 focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
                      : "border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                />
                {errors.customer_name ? (
                  <p className="mt-1 text-[12px] text-rose-600">
                    {errors.customer_name}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor={`${formTitleId}-customer-email`} className="mb-1.5 block text-sm font-bold text-textmain">
                  Email <span className="font-bold text-rose-500">*</span>
                </label>
                <input
                  id={`${formTitleId}-customer-email`}
                  name="customer_email"
                  type="email"
                  placeholder="nama@email.com"
                  value={values.customer_email}
                  onChange={handleChange}
                  className={`h-10 w-full rounded-[6px] bg-white px-3 text-sm text-textmain transition-all focus:outline-none ${
                    errors.customer_email
                      ? "border border-rose-600 focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
                      : "border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                />
                <p className={`mt-1 text-[12px] ${errors.customer_email ? "text-rose-600" : "text-textmuted"}`}>
                  {errors.customer_email ?? "Gunakan email aktif atau email kampus"}
                </p>
              </div>

              <div>
                <label htmlFor={`${formTitleId}-customer-phone`} className="mb-1.5 block text-sm font-bold text-textmain">
                  Nomor Telepon / WhatsApp{" "}
                  <span className="font-bold text-rose-500">*</span>
                </label>
                <input
                  id={`${formTitleId}-customer-phone`}
                  name="customer_phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={values.customer_phone}
                  onChange={handleChange}
                  className={`h-10 w-full rounded-[6px] bg-white px-3 text-sm text-textmain transition-all focus:outline-none ${
                    errors.customer_phone
                      ? "border border-rose-600 focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
                      : "border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                />
                {errors.customer_phone ? (
                  <p className="mt-1 text-[12px] text-rose-600">
                    {errors.customer_phone}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor={`${formTitleId}-unit-usaha`} className="mb-1.5 block text-sm font-bold text-textmain">
                  Pilih Unit Usaha{" "}
                  <span className="font-bold text-rose-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <select
                    id={`${formTitleId}-unit-usaha`}
                    name="unit_usaha_id"
                    value={values.unit_usaha_id}
                    onChange={handleChange}
                    className={`h-10 w-full appearance-none cursor-pointer rounded-[6px] bg-white px-3 pr-10 text-sm text-textmain transition-all focus:outline-none ${
                      errors.unit_usaha_id
                        ? "border border-rose-600 focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
                        : "border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                  >
                    {businessUnits.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pointer-events-none absolute right-3 text-[20px] text-textmuted">
                    keyboard_arrow_down
                  </span>
                </div>
                {errors.unit_usaha_id ? (
                  <p className="mt-1 text-[12px] text-rose-600">
                    {errors.unit_usaha_id}
                  </p>
                ) : null}
              </div>

              <div>
                <label htmlFor={`${formTitleId}-title`} className="mb-1.5 block text-sm font-bold text-textmain">
                  Judul Permintaan <span className="font-bold text-rose-500">*</span>
                </label>
                <input
                  id={`${formTitleId}-title`}
                  name="title"
                  type="text"
                  placeholder="Contoh: Permintaan layanan ruang pertemuan"
                  value={values.title}
                  onChange={handleChange}
                  className={`h-10 w-full rounded-[6px] bg-white px-3 text-sm text-textmain transition-all focus:outline-none ${
                    errors.title
                      ? "border border-rose-600 focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
                      : "border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                />
                {errors.title ? (
                  <p className="mt-1 text-[12px] text-rose-600">{errors.title}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor={`${formTitleId}-description`} className="mb-1.5 block text-sm font-bold text-textmain">
                  Detail Permintaan <span className="font-bold text-rose-500">*</span>
                </label>
                <textarea
                  id={`${formTitleId}-description`}
                  name="description"
                  rows={3}
                  placeholder="Tuliskan rincian kebutuhan atau catatan khusus..."
                  value={values.description}
                  onChange={handleChange}
                  className={`h-[90px] w-full resize-none rounded-[6px] bg-white p-3 text-sm text-textmain transition-all focus:outline-none ${
                    errors.description
                      ? "border border-rose-600 focus:border-rose-600 focus:ring-1 focus:ring-rose-600"
                      : "border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary"
                  }`}
                />
                {errors.description ? (
                  <p className="mt-1 text-[12px] text-rose-600">
                    {errors.description}
                  </p>
                ) : null}
              </div>

              <div className="mt-2 -mx-6 -mb-1 flex items-center justify-end gap-3 border-t border-borderline px-6 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-10 rounded-[6px] border border-border-subtle bg-transparent px-5 text-sm font-semibold whitespace-nowrap text-textmain transition-colors hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-10 items-center justify-center gap-1.5 rounded-[6px] bg-primary px-5 text-sm font-bold whitespace-nowrap text-white shadow-sm transition-colors hover:bg-[#162e5b]"
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Permintaan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
