"use client";
import React from "react";
import Link from "next/link";
import NavItem from "../sidebar/LinkItem";
import SettingsDropdown from "../sidebar/SettingsDropdown";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-bg flex flex-col py-4 border-l border-border">
      {/* Logo area */}
      <div className="px-4 mb-6">
        <Link href="/dashboard" className="flex items-center">
          <span className="text-main font-bold text-xl">Langame</span>
        </Link>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-2">
        <NavItem href="/play" icon="🎮">
          שחק
        </NavItem>
      </nav>
      {/* Bottom settings */}
      <div className="px-4 pt-4">
        <SettingsDropdown />
      </div>
    </div>
  );
};

export default Sidebar;
