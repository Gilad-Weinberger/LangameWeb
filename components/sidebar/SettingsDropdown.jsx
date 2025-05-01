import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

const SettingsDropdown = () => {
  const { logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    // Navigation is handled in AuthContext
  };

  return (
    <div className="group relative">
      <div className="flex items-center py-3 px-4 text-text-primary hover:bg-main hover:text-bg rounded transition-colors cursor-pointer">
        <span className="mx-3">⚙️</span>
        <span>הגדרות</span>
      </div>
      <div className="absolute hidden group-hover:block right-full bottom-0 ml-2 bg-bg border border-border rounded shadow-lg z-10">
        <Link
          href="/settings"
          className="flex items-center px-4 py-2 text-text-primary hover:bg-main hover:text-bg whitespace-nowrap"
        >
          <span className="ml-2">⚙️</span>
          כל ההגדרות
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-right px-4 py-2 text-text-primary hover:bg-main hover:text-bg whitespace-nowrap"
        >
          <span className="ml-2">🚪</span>
          התנתקות
        </button>
      </div>
    </div>
  );
};

export default SettingsDropdown;
