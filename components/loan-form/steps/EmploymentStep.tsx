"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading, TextInput, SelectInput } from "../fields";
import type { FullLoanApplicationValues } from "@/lib/validation/loanApplicationSchema";

const conditionalBlock = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
};

export function EmploymentStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FullLoanApplicationValues>();

const employmentType = useWatch({
  control,
  name: "employmentType",
  defaultValue: "Salaried",
});
  const isSalariedFamily = employmentType === "Salaried" || employmentType === "Government Employee";
  const isBusinessFamily = employmentType === "Self Employed" || employmentType === "Business Owner";

  return (
    <div>
      <SectionHeading title="Employment Details" subtitle="This helps our partner banks assess your application" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <SelectInput
            label="Employment Type"
            options={["Salaried", "Self Employed", "Business Owner", "Government Employee"]}
            error={errors.employmentType}
            {...register("employmentType")}
          />
        </div>

        <AnimatePresence mode="popLayout">
          {isSalariedFamily && (
            <motion.div key="salaried-fields" {...conditionalBlock} className="col-span-full grid grid-cols-1 gap-5 overflow-hidden sm:grid-cols-2">
              <TextInput label="Company Name" placeholder="e.g. Tata Consultancy Services" error={errors.companyName} {...register("companyName")} />
              <TextInput label="Employee ID" placeholder="Your employee ID" error={errors.employeeId} {...register("employeeId")} />
              <TextInput label="Job Title" placeholder="e.g. Software Engineer" error={errors.jobTitle} {...register("jobTitle")} />
              <TextInput label="Joining Date" type="date" error={errors.joiningDate} {...register("joiningDate")} />
            </motion.div>
          )}

          {isBusinessFamily && (
            <motion.div key="business-fields" {...conditionalBlock} className="col-span-full grid grid-cols-1 gap-5 overflow-hidden sm:grid-cols-2">
              <TextInput label="Business Name" placeholder="Registered business name" error={errors.businessName} {...register("businessName")} />
              <TextInput label="GST Number (optional)" placeholder="15-character GSTIN" error={errors.gstNumber} {...register("gstNumber")} />
              <TextInput
                label="Annual Turnover (₹)"
                type="number"
                placeholder="e.g. 1200000"
                error={errors.annualTurnover}
                {...register("annualTurnover")}
              />
              <TextInput
                label="Business Vintage (years)"
                type="number"
                placeholder="Years in operation"
                error={errors.businessVintageYears}
                {...register("businessVintageYears")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <TextInput
          label="Total Work Experience (years)"
          type="number"
          placeholder="e.g. 5"
          error={errors.workExperienceYears}
          {...register("workExperienceYears")}
        />
        <TextInput
          label="Monthly Salary / Income (₹)"
          type="number"
          placeholder="e.g. 65000"
          error={errors.monthlySalary}
          {...register("monthlySalary")}
        />
        <TextInput
          label="Annual Income (₹, optional)"
          type="number"
          placeholder="e.g. 780000"
          error={errors.annualIncome}
          {...register("annualIncome")}
        />
        <TextInput label="Salary / Primary Bank" placeholder="e.g. HDFC Bank" error={errors.salaryBank} {...register("salaryBank")} />

        <div className="sm:col-span-2">
          <TextInput
            label={isBusinessFamily ? "Business Address" : "Office Address"}
            placeholder="Full office / business address"
            error={errors.officeAddress}
            {...register("officeAddress")}
          />
        </div>
      </div>
    </div>
  );
}
