"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  revenue: string;
  services: string[];
  message: string;
}

const revenueOptions = [
  "Under ₹50L",
  "₹50L - ₹1Cr",
  "₹1Cr - ₹10Cr",
  "₹10Cr - ₹25Cr",
  "₹25Cr+",
];

const serviceOptions = [
  "Brand Strategy & Identity",
  "Social Media Marketing",
  "Content Marketing",
  "Performance Marketing",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-accent/30 bg-bg-secondary p-8 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-accent" />
        <h3 className="font-heading text-xl font-bold text-text-primary">
          Message Sent!
        </h3>
        <p className="mt-2 text-text-secondary">
          We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-accent hover:text-accent-light"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-bg-tertiary px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors";
  const labelClass = "mb-1.5 block text-sm font-medium text-text-primary";
  const errorClass = "mt-1 text-xs text-red-400";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>
            Name <span className="text-accent">*</span>
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Your name"
            className={inputClass}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="you@company.com"
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Phone</label>
          <input
            {...register("phone")}
            placeholder="+91 98765 43210"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Company <span className="text-accent">*</span>
          </label>
          <input
            {...register("company", { required: "Company name is required" })}
            placeholder="Your company name"
            className={inputClass}
          />
          {errors.company && (
            <p className={errorClass}>{errors.company.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Monthly Revenue Range</label>
        <select {...register("revenue")} className={cn(inputClass, "appearance-none")}>
          <option value="">Select revenue range</option>
          {revenueOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Services Interested In</label>
        <div className="grid grid-cols-2 gap-2">
          {serviceOptions.map((service) => (
            <label
              key={service}
              className="flex items-center gap-2 rounded-lg border border-border bg-bg-tertiary px-3 py-2.5 text-sm text-text-primary transition-colors has-[:checked]:border-accent/50 has-[:checked]:bg-accent/10 cursor-pointer"
            >
              <input
                type="checkbox"
                value={service}
                {...register("services")}
                className="accent-accent"
              />
              {service}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          {...register("message", {
            required: "Message is required",
            minLength: { value: 20, message: "Please write at least 20 characters" },
          })}
          rows={4}
          placeholder="Tell us about your brand and what you're looking for..."
          className={cn(inputClass, "resize-none")}
        />
        {errors.message && (
          <p className={errorClass}>{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-bg-primary transition-all hover:bg-accent-light disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
