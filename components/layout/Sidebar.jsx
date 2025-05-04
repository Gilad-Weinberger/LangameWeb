"use client";

import React from "react";
import Link from "next/link";
import NavItem from "../sidebar/LinkItem";
import SettingsDropdown from "../sidebar/SettingsDropdown";

// Reusing CloseIcon definition - ideally, move to a shared component
const CloseIcon = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-4 right-4 p-2 text-text hover:text-main focus:outline-none md:hidden"
    aria-label="Close sidebar"
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

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`fixed top-0 bottom-0 right-0 z-50 w-64 bg-bg flex flex-col py-4 border-l border-border overflow-y-auto shadow-lg transition-transform duration-300 ease-in-out md:static md:h-screen md:z-auto md:border-l md:shadow-none md:translate-x-0 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      dir="rtl"
    >
      {/* Close button for mobile */}
      <CloseIcon onClick={onClose} />

      {/* Logo area */}
      <div className="px-4 mb-6 pt-10 md:pt-0">
        {" "}
        {/* Add padding top for mobile close button space */}
        <Link href="/dashboard" className="flex items-center">
          <span className="text-main font-bold text-xl">Langame</span>
        </Link>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1" onClick={onClose}>
        {" "}
        {/* Close sidebar on link click */}
        <NavItem href="/play" icon="🎮">
          שחק
        </NavItem>
        <NavItem href="/learn" icon="📚">
          למד
        </NavItem>
      </nav>
      {/* Bottom settings */}
      <div
        className="px-4 pt-4 space-y-1 border-t border-border mt-4"
        onClick={onClose}
      >
        {" "}
        {/* Close sidebar on link click */}
        <NavItem href="/feedback" icon="💡">
          פידבק
        </NavItem>
        <SettingsDropdown />
      </div>
    </aside>
  );
};

export default Sidebar;
