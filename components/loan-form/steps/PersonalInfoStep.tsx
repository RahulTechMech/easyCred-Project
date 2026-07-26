"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { SectionHeading, TextInput, SelectInput } from "../fields";
import type { FullLoanApplicationValues } from "@/lib/validation/loanApplicationSchema";
import { otpService } from "@/lib/services/otp";

export function PersonalInfoStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FullLoanApplicationValues>();

  const [otpStage, setOtpStage] = useState<"idle" | "sent" | "verified">("idle");
  const [otpValue, setOtpValue] = useState("");
  const [otpError, setOtpError] = useState("");
  const mobileNumber = watch("mobileNumber");

  function sendOtp() {
    if (!/^[6-9]\d{9}$/.test(mobileNumber || "")) {
      setOtpError("Enter a valid mobile number first");
      return;
    }
    setOtpError("");
    otpService.sendOtp(mobileNumber).then((res) => {
      if (res.success) setOtpStage("sent");
      else setOtpError(res.message || "Could not send OTP. Try again.");
    });
  }

  function verifyOtp() {
    otpService.verifyOtp(mobileNumber, otpValue).then((res) => {
      if (res.success) {
        setOtpError("");
        setOtpStage("verified");
        setValue("otpVerified", true, { shouldValidate: true });
      } else {
        setOtpError(res.message || "Invalid OTP");
      }
    });
  }

  return (
    <div>
      <SectionHeading title="Personal Information" subtitle="Tell us a little about yourself" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <TextInput label="Full Name" placeholder="As per PAN / Aadhaar" error={errors.fullName} {...register("fullName")} />
        </div>

        <div>
          <TextInput
            label="Mobile Number"
            placeholder="10-digit mobile number"
            inputMode="numeric"
            maxLength={10}
            error={errors.mobileNumber}
            disabled={otpStage === "verified"}
            {...register("mobileNumber")}
          />
          <div className="mt-2 flex items-center gap-2">
            {otpStage !== "verified" && (
              <button
                type="button"
                onClick={sendOtp}
                className="text-xs font-medium text-signal-300 transition-colors hover:text-signal-200"
              >
                {otpStage === "sent" ? "Resend OTP" : "Send OTP"}
              </button>
            )}
            {otpStage === "verified" && (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1 text-xs font-medium text-mint-500"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Mobile number verified
              </motion.span>
            )}
          </div>

          {otpStage === "sent" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 flex gap-2">
              <input
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                inputMode="numeric"
                placeholder="Enter 6-digit OTP"
                className="w-40 rounded-xl border border-hairline/10 bg-ink-800/60 px-3 py-2 text-sm tracking-widest text-frost-50 outline-none focus:border-signal-400"
              />
              <button
                type="button"
                onClick={verifyOtp}
                className="rounded-xl bg-signal-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-signal-400"
              >
                Verify
              </button>
            </motion.div>
          )}
          {(otpError || errors.otpVerified) && (
            <p className="mt-1.5 text-xs text-red-400">{otpError || errors.otpVerified?.message}</p>
          )}
        </div>

        <TextInput label="Email Address" type="email" placeholder="you@example.com" error={errors.email} {...register("email")} />

        <TextInput label="Date of Birth" type="date" error={errors.dateOfBirth} {...register("dateOfBirth")} />

        <SelectInput
          label="Gender"
          options={["Male", "Female", "Other", "Prefer not to say"]}
          error={errors.gender}
          {...register("gender")}
        />

        <TextInput
          label="PAN Number"
          placeholder="ABCDE1234F"
          maxLength={10}
          style={{ textTransform: "uppercase" }}
          error={errors.panNumber}
          {...register("panNumber")}
        />

        <TextInput
          label="Aadhaar Number (optional)"
          placeholder="12-digit Aadhaar number"
          inputMode="numeric"
          maxLength={12}
          error={errors.aadhaarNumber}
          {...register("aadhaarNumber")}
        />

        <SelectInput
          label="Marital Status"
          options={["Single", "Married", "Divorced", "Widowed"]}
          error={errors.maritalStatus}
          {...register("maritalStatus")}
        />

        <div className="sm:col-span-2">
          <TextInput
            label="Current Address"
            placeholder="House / Street / Locality"
            error={errors.currentAddress}
            {...register("currentAddress")}
          />
        </div>

        <TextInput label="City" placeholder="e.g. Mumbai" error={errors.city} {...register("city")} />
        <TextInput label="State" placeholder="e.g. Maharashtra" error={errors.state} {...register("state")} />
        <TextInput label="PIN Code" placeholder="6-digit PIN" inputMode="numeric" maxLength={6} error={errors.pinCode} {...register("pinCode")} />
      </div>
    </div>
  );
}
