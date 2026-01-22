"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import Image from "next/image";
// import { Close } from "../../icons";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="bg-white shadow">
      <nav
        className={`w-full flex flex-col items-center justify-center pr-0 pl-4 sm:pr-4 fixed top-0 bg-white/80 backdrop-blur-xs z-50`}
      >
        <div className="flex justify-between items-center w-full">
          <Link href="/">
            <div className="text-spiritblue text-lg text-bold logo">
              PONO YA MOYA
            </div>
          </Link>
          <div className="sm:hidden nav-link">
            <Button typeStyle="tertiary" onClick={toggleMenu}>
              <span className="font-bold text-spiritblue">MENU</span>
            </Button>
          </div>
          <ul className="hidden sm:flex sm:gap-4 sm:py-2 nav-link">
            <li>
              <Link href="/offerings">OFFERINGS</Link>
            </li>
            <li>
              <Link href="/about">ABOUT</Link>
            </li>
            <li>
              <Link href="/contact">CONTACT</Link>
            </li>
          </ul>
        </div>
        {/* COLLAPSE MENU */}
        <div
          className={`${isOpen ? "absolute right-0 top-0 rounded-tl-xl rounded-bl-xl bg-spiritblue flex flex-col items-end z-50 min-w-[150px] min-h-[200px] opacity-100" : "opacity-0 hidden"} transition-all duration-200 sm:hidden nav-link`}
        >
          <div className="w-full flex justify-end">
            {" "}
            <Button
              onClick={toggleMenu}
              typeStyle="tertiary"
              className="text-white"
            >
              <Image
                src={"/icons/close.svg"}
                alt="Close"
                width={24}
                height={24}
                className="invert"
              />
            </Button>
          </div>
          <ul className="flex flex-col gap-4 p-4 items-end text-white">
            <li>
              <Link href="/offerings" onClick={toggleMenu}>
                OFFERINGS
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={toggleMenu}>
                ABOUT
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={toggleMenu}>
                CONTACT
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
