"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div>
      <ul style={{
        listStyle: "none"
      }}>
        <li>
          <Link
            href="/"
            style={{
              color: pathname === "/" ? "blue" : "black",
            }}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            style={{
              color: pathname === "/about" ? "blue" : "black",
            }}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            style={{
              color: pathname === "/products" ? "blue" : "black",
            }}
          >
            Products
          </Link>
        </li>
      </ul>
    </div>
  );
}
