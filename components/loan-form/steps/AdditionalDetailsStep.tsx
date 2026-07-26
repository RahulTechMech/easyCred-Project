"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading, TextInput, SelectInput, ToggleField } from "../fields";
import type { FullLoanApplicationValues } from "@/lib/validation/loanApplicationSchema";

export function AdditionalDetailsStep() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<FullLoanApplicationValues>();

  const isPropertyOwner = useWatch({ control, name: "isPropertyOwner" });
  const isVehicleOwner = useWatch({ control, name: "isVehicleOwner" });
  const hasGuarantor = useWatch({ control, name: "hasGuarantor" });
  const consentGiven = useWatch({ control, name: "consentGiven" });

  return (
    <div>
      <SectionHeading title="Additional Details" subtitle="Just a few more things before you review your application" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ToggleField label="Property Owner?" checked={!!isPropertyOwner} onChange={(v) => setValue("isPropertyOwner", v)} />
        <ToggleField label="Vehicle Owner?" checked={!!isVehicleOwner} onChange={(v) => setValue("isVehicleOwner", v)} />
        <ToggleField label="Do you have a Guarantor?" checked={!!hasGuarantor} onChange={(v) => setValue("hasGuarantor", v)} />
      </div>

      <AnimatePresence>
        {hasGuarantor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 grid grid-cols-1 gap-5 overflow-hidden sm:grid-cols-2"
          >
            <TextInput label="Guarantor Name" placeholder="Full name" {...register("guarantorName")} />
            <TextInput label="Relation to Guarantor" placeholder="e.g. Brother, Spouse" {...register("guarantorRelation")} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <SelectInput
          label="Preferred Contact Time"
          options={["Morning (9AM - 12PM)", "Afternoon (12PM - 4PM)", "Evening (4PM - 8PM)", "Anytime"]}
          error={errors.preferredContactTime}
          {...register("preferredContactTime")}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="remarks" className="mb-1.5 block text-sm font-medium text-frost-200">
          Remarks (optional)
        </label>
        <textarea
          id="remarks"
          rows={3}
          placeholder="Anything else you'd like us to know?"
          className="w-full rounded-xl border border-hairline/10 bg-ink-800/60 px-4 py-3 text-sm text-frost-50 outline-none placeholder:text-frost-400/60 focus:border-signal-400"
          {...register("remarks")}
        />
        {errors.remarks && <p className="mt-1.5 text-xs text-red-400">{errors.remarks.message}</p>}
      </div>

      <div className="mt-6 rounded-xl border border-hairline/10 bg-ink-800/40 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-hairline/20 bg-ink-800 text-signal-500 focus:ring-signal-400"
            {...register("consentGiven")}
          />
          <span className="text-sm text-frost-200">
            I authorize EasyCred to contact me regarding loan assistance via call, SMS, WhatsApp, or email, and
            confirm that the details provided are accurate to the best of my knowledge.
          </span>
        </label>
        {errors.consentGiven && <p className="mt-2 text-xs text-red-400">{errors.consentGiven.message}</p>}
      </div>
    </div>
  );
}
