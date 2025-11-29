'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/races", label: "Races" },
  { href: "/sessions", label: "Sessions" },
  { href: "/ai/menu", label: "AI Menu" },
  { href: "/ai/reflect", label: "AI Reflect" },
  { href: "/ble", label: "BLE" }
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="nav">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link key={link.href} href={link.href} className={active ? "active" : ""}>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
