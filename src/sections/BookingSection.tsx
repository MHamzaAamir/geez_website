"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type FormStatus = {
  type: "idle" | "success" | "error";
  message: string;
};

export default function BookingSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
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

      event.currentTarget.reset();
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
    <section className="w-screen bg-linear-to-b from-[#000123] to-[#782995] py-10 text-white md:py-32">
      <div className="section-container">
        <div className="grid min-h-[80vh] grid-cols-1 overflow-hidden md:grid-cols-2">
          <div className="relative min-h-80 md:min-h-full">
            <Image
              src="/NEAT.png"
              alt="Book a call"
              fill
              className="object-contain object-center"
              priority={false}
            />
          </div>

          <div className="flex items-center px-5 py-8 sm:px-8 md:px-10 md:py-10">
            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <div>
                <h1 className="text-4xl leading-tight sm:text-8xl">
                  BOOK A FREE
                </h1>
                <h2 className="text-2xl leading-tight font-bold sm:text-[74px] ml-0.5">
                  DISCOVERY CALL
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                <input
                  type="text"
                  name="name"
                  placeholder="NAME"
                  required
                  className="w-full text-[#3B3C58] placeholder:text-[#3B3C58] bg-[#FFE500] px-4 py-3 col-span-2 md:col-span-1 focus:outline-none focus-visible:outline-none focus:ring-0 top-right-bottom-left-clip-form"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="EMAIL"
                  required
                  className="w-full text-[#3B3C58] placeholder:text-[#3B3C58] bg-[#FFE500] px-4 py-3 col-span-2 md:col-span-1 focus:outline-none focus-visible:outline-none focus:ring-0 top-right-bottom-left-clip-form"
                />

                <textarea
                  name="message"
                  placeholder="YOUR MESSAGE"
                  rows={5}
                  required
                  className="text-[#3B3C58] placeholder:text-[#3B3C58] bg-[#FFE500] col-span-2 w-full resize-none px-4 py-3  focus:outline-none focus-visible:outline-none focus:ring-0 top-right-bottom-left-clip-form"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#9231B7] px-4 py-3 font-semibold transition-opacity focus:outline-none focus-visible:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60 top-right-bottom-left-clip-form cursor-pointer"
                >
                  {isSubmitting ? "SENDING..." : "SEND"}
                </button>

                <button
                  type="button"
                  className="w-full bg-white text-black px-4 py-3 font-semibold focus:outline-none focus-visible:outline-none focus:ring-0 top-right-bottom-left-clip-form cursor-pointer"
                >
                  BOOK A CALL
                </button>
              </div>

              <div className="min-h-6">
                <p
                  aria-live="polite"
                  className={`text-sm ${
                    status.type === "error" ? "text-red-300" : "text-green-300"
                  } ${status.message ? "opacity-100" : "opacity-0"}`}
                >
                  {status.message}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
