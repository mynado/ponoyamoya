"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "./ui/Button";
import { SiteSettings } from "@/lib/sanity/types/index";

export default function Header({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = settings?.navigation || [];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow">
      <nav
        className={`w-full flex flex-col items-center justify-center pr-2 pl-4 md:px-4 fixed top-0 backdrop-blur-xs z-50`}
      >
        <div className="flex justify-between font-body items-center w-full">
          <Link href="/">
            <div className="text-spiritblue text-lg text-bold logo">
              moyabyssal
            </div>
          </Link>

          {/* Mobile menu toggle */}
          <div className="sm:hidden nav-link">
            <Button
              onClick={toggleMenu}
              typeStyle="tertiary"
              className="flex flex-col justify-center items-center w-10 h-10 gap-[5px] focus:outline-none"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-[2px] w-6 bg-spiritblue rounded-full transition-all duration-300 origin-center ${
                  isOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-6 bg-spiritblue rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-6 bg-spiritblue rounded-full transition-all duration-300 origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </Button>
          </div>

          {/* Desktop nav */}
          <ul className="hidden sm:flex sm:gap-4 sm:py-2 nav-link">
            {navigation.map((item) => (
              <li key={item.label}>
                <Link href={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* MOBILE OVERLAY */}
        <div
          className={`
            sm:hidden fixed inset-0 top-10 z-50 bg-spiritblue
            flex flex-col justify-between
            transition-all duration-500 ease-in-out
            ${
              isOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-full pointer-events-none"
            }
          `}
        >
          {/* Centered nav items */}
          <ul className="flex flex-col items-end bg-spiritblue py-12 px-4 justify-center gap-8 flex-1 nav-link">
            {navigation.map((item, index) => (
              <li
                key={item.label}
                className={`
                  transition-all duration-500
                  ${
                    isOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  }
                `}
                style={{
                  transitionDelay: isOpen ? `${index * 80 + 150}ms` : "0ms",
                }}
              >
                <Link
                  href={item.path}
                  onClick={toggleMenu}
                  className="text-white text-3xl tracking-widest font-body hover:opacity-60 transition-opacity duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
