import Image from "next/image";
import Link from "next/link";

const links = [
  { name: "INDUSTRIES", href: "/" },
  { name: "BUNDLES", href: "/" },
  { name: "SERVICES", href: "/" },
  { name: "ABOUT", href: "/" },
  { name: "SHOWREEL", href: "/" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-10 right-0 z-20 flex h-15 w-[95%] items-center bg-[#1D1D2B]/80">
      {/* Left white line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-white/80" />

      {/* Content */}
      <div className="flex w-full items-center justify-between gap-10 pl-8">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#FFE102] transition-colors hover:text-white/70"
            >
              {link.name}
            </Link>
          ))}
          <button>Contact Us</button>
          <button>Book A Meet</button>
        </div>
      </div>
    </nav>
  );
}
