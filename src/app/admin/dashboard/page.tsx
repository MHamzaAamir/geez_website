import Link from "next/link";
import { CalendarCheck, FileText } from "lucide-react";

const cards = [
  {
    title: "Bookings",
    description: "View and manage client booking requests",
    icon: CalendarCheck,
    href: "/admin/dashboard/bookings",
    gradient: "from-emerald-500 to-teal-600",
    available: true,
  },
  {
    title: "Blogs",
    description: "Coming soon — manage blog posts and articles",
    icon: FileText,
    href: "#",
    gradient: "from-violet-500 to-purple-600",
    available: false,
  },
];

function DashboardCard({
  title,
  description,
  icon: Icon,
  href,
  gradient,
  available,
}: (typeof cards)[number]) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-6 transition-all duration-300 hover:border-neutral-600 ${
        available ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
      />
      <div className="relative space-y-4">
        <div
          className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${gradient}`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {!available && (
              <span className="rounded-full border border-neutral-700 px-2 py-0.5 text-[10px] font-medium text-neutral-500 uppercase tracking-wider">
                Soon
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-neutral-400">{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
          Overview
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}
