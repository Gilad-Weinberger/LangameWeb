"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";

// Simple hamburger icon component
const HamburgerIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-main md:hidden"
    aria-label="Open menu"
  >
    <svg
      className="h-6 w-6 text-text"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  </button>
);

// Simple close icon component
const CloseIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-4 right-4 p-2 text-text hover:text-main focus:outline-none md:hidden"
    aria-label="Close menu"
  >
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

const PageLayout = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-bg" dir="rtl">
      {/* Mobile Header */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-border bg-bg px-4 md:hidden"
        dir="rtl"
      >
        <Link href="/dashboard" className="flex items-center">
          <span className="text-main font-bold text-xl">Langame</span>
        </Link>
        <HamburgerIcon onClick={toggleMobileSidebar} />
      </header>

      {/* Sidebar */}
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}
      {/* Pass state and close function to Sidebar */}
      <Sidebar isOpen={isMobileSidebarOpen} onClose={closeMobileSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 overflow-auto bg-bg transition-all duration-300 ease-in-out pt-20 pb-8 px-4 sm:px-6 md:pt-8 md:px-8 lg:px-16 ${
          isMobileSidebarOpen ? "md:mr-64" : "" // Keep margin for desktop sidebar
        }`}
        dir="rtl"
      >
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
