"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { motion } from "framer-motion";
import { contactMessageSchema, type ContactMessageValues } from "@/lib/validation/contactSchema";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactMessageValues>({ resolver: zodResolver(contactMessageSchema) });

  const onSubmit = handleSubmit(async (data) => {
    setStatus("submitting");
    try {
      // Honeypot value is read directly from the DOM (not via RHF/zod, which
      // would strip an unrecognized field before it ever reaches here) and
      // merged into the payload so the API route's spam check still works.
      await axios.post("/api/contact", { ...data, website: honeypotRef.current?.value || "" });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  });

  const inputCls =
    "w-full rounded-xl border border-hairline/10 bg-ink-800/60 px-4 py-3 text-sm text-frost-50 outline-none placeholder:text-frost-400/60 focus:border-signal-400";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-xl2 p-8 text-center shadow-card"
      >
        <p className="font-display text-lg font-semibold text-frost-50">Message sent!</p>
        <p className="mt-1 text-sm text-frost-400">We&apos;ll get back to you shortly.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-medium text-signal-300 hover:text-signal-200">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-panel space-y-4 rounded-xl2 p-6 shadow-card sm:p-8">
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" ref={honeypotRef} name="website" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <input placeholder="Full Name" className={inputCls} {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <input placeholder="Mobile Number" className={inputCls} {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <input placeholder="Email Address" type="email" className={inputCls} {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <div>
        <input placeholder="Subject" className={inputCls} {...register("subject")} />
        {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
      </div>

      <div>
        <textarea placeholder="Your message" rows={4} className={inputCls} {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      {status === "error" && <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">Something went wrong. Please try again.</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-grad-signal px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
