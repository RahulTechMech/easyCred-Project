"use client";

import { forwardRef } from "react";
import clsx from "clsx";
import type { FieldError } from "react-hook-form";

function FieldError({ error }: { error?: FieldError }) {
  if (!error) return null;
  return (
    <p className="mt-1.5 text-xs text-red-400" role="alert">
      {error.message}
    </p>
  );
}

const baseInputClasses =
  "w-full rounded-xl bg-ink-800/60 border border-hairline/10 px-4 py-3 text-sm text-frost-50 placeholder:text-frost-400/60 outline-none transition-colors duration-150 focus:border-signal-400 focus:bg-ink-800";

export const TextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: FieldError; hint?: string }
>(({ label, error, hint, id, ...props }, ref) => {
  const inputId = id || props.name;
  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-frost-200">
        {label}
      </label>
      <input
        id={inputId}
        ref={ref}
        className={clsx(baseInputClasses, error && "border-red-500/60 focus:border-red-400")}
        aria-invalid={!!error}
        {...props}
      />
      {hint && !error && <p className="mt-1.5 text-xs text-frost-400">{hint}</p>}
      <FieldError error={error} />
    </div>
  );
});
TextInput.displayName = "TextInput";

export const SelectInput = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: FieldError; options: string[] }
>(({ label, error, options, id, ...props }, ref) => {
  const inputId = id || props.name;
  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-frost-200">
        {label}
      </label>
      <select
        id={inputId}
        ref={ref}
        className={clsx(baseInputClasses, "appearance-none", error && "border-red-500/60 focus:border-red-400")}
        aria-invalid={!!error}
        {...props}
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-ink-800">
            {opt}
          </option>
        ))}
      </select>
      <FieldError error={error} />
    </div>
  );
});
SelectInput.displayName = "SelectInput";

export function ToggleField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      className="flex w-full items-center justify-between rounded-xl border border-hairline/10 bg-ink-800/40 px-4 py-3 text-left transition-colors hover:border-hairline/20"
    >
      <span>
        <span className="block text-sm font-medium text-frost-50">{label}</span>
        {description && <span className="block text-xs text-frost-400">{description}</span>}
      </span>
      <span
        className={clsx(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
          checked ? "bg-signal-500" : "bg-hairline/10"
        )}
      >
        <span
          className={clsx(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </span>
    </button>
  );
}

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-xl font-semibold text-frost-50 sm:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-frost-400">{subtitle}</p>}
    </div>
  );
}
