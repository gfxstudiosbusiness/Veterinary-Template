"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Graduates", href: "/graduates" }, // Updated link
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200/50">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-slate-100 shadow-sm">
             <Image 
               src="/images/logo.jpg" 
               alt="COS Veterinary Clinic" 
               fill 
               className="object-cover"
             />
          </div>
          <div className="flex flex-col">
             <span className="font-bold text-lg leading-tight text-slate-900">COS</span>
             <span className="text-xs font-medium text-slate-500 tracking-wider">VETERINARY CLINIC</span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors hover:bg-slate-50 px-3 py-2 rounded-md"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/appointment">
            <Button className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-primary/20">
              Book Appointment
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 w-full glass border-b border-slate-200/50 p-4 flex flex-col gap-4 animate-in slide-in-from-top-5 shadow-xl">
           {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-base font-medium text-slate-800 hover:text-primary transition-colors p-3 rounded-md hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/appointment" onClick={() => setIsOpen(false)}>
            <Button className="w-full rounded-full font-bold shadow-md">
              Book Appointment
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
