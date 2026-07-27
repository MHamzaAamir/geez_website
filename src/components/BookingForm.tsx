"use client";

import { SubmitEvent, useState } from "react";
import { FormStatus } from "@/types/BookingSectionTypes";

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  // async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const payload = {
  //     name: String(formData.get("name") ?? "").trim(),
  //     email: String(formData.get("email") ?? "").trim(),
  //     message: String(formData.get("message") ?? "").trim(),
  //   };

  //   setIsSubmitting(true);
  //   setStatus({ type: "idle", message: "" });

  //   try {
  //     const response = await fetch("/api/booking", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = (await response.json()) as { message?: string };

  //     if (!response.ok) {
  //       setStatus({
  //         type: "error",
  //         message: data.message ?? "Could not submit form. Please try again.",
  //       });
  //       return;
  //     }

  //     event.currentTarget.reset();
  //     setStatus({
  //       type: "success",
  //       message: data.message ?? "Thanks! Your request has been submitted.",
  //     });
  //   } catch {
  //     setStatus({
  //       type: "error",
  //       message: "Network error. Please check your connection and retry.",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget; // ✅ capture it early, synchronously

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({
          type: "error",
          message: data.message ?? "Could not submit form. Please try again.",
        });
        return;
      }

      form.reset(); // ✅ use the saved reference, not event.currentTarget
      setStatus({
        type: "success",
        message: data.message ?? "Thanks! Your request has been submitted.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Network error. Please check your connection and retry.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit}>
      <div>
        <h1 className="text-4xl leading-tight sm:text-8xl">BOOK A FREE</h1>
        <h2 className="ml-0.5 text-2xl leading-tight font-bold sm:text-[74px]">
          DISCOVERY CALL
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <input
          type="text"
          name="name"
          placeholder="NAME"
          required
          className="top-right-bottom-left-clip-form col-span-2 w-full bg-[#FFE500] px-4 py-3 text-[#3B3C58] placeholder:text-[#3B3C58] focus:ring-0 focus:outline-none focus-visible:outline-none md:col-span-1"
        />

        <input
          type="email"
          name="email"
          placeholder="EMAIL"
          required
          className="top-right-bottom-left-clip-form col-span-2 w-full bg-[#FFE500] px-4 py-3 text-[#3B3C58] placeholder:text-[#3B3C58] focus:ring-0 focus:outline-none focus-visible:outline-none md:col-span-1"
        />

        <textarea
          name="message"
          placeholder="YOUR MESSAGE"
          rows={5}
          required
          className="top-right-bottom-left-clip-form col-span-2 w-full resize-none bg-[#FFE500] px-4 py-3 text-[#3B3C58] placeholder:text-[#3B3C58] focus:ring-0 focus:outline-none focus-visible:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="top-right-bottom-left-clip-form w-full cursor-pointer bg-[#9231B7] px-4 py-3 font-semibold transition-opacity focus:ring-0 focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "SENDING..." : "SEND"}
        </button>

        <button
          type="button"
          className="top-right-bottom-left-clip-form w-full cursor-pointer bg-white px-4 py-3 font-semibold text-black focus:ring-0 focus:outline-none focus-visible:outline-none"
        >
          BOOK A CALL
        </button>
      </div>

      <div className="min-h-6">
        <p
          aria-live="polite"
          className={`text-sm ${status.type === "error" ? "text-red-300" : "text-green-300"} ${status.message ? "opacity-100" : "opacity-0"}`}
        >
          {status.message}
        </p>
      </div>
    </form>
  );
}
