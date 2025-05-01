import Link from "next/link";

const NavItem = ({ href, icon, children }) => (
  <Link
    href={href}
    className="flex items-center py-3 px-4 text-text-primary hover:bg-main hover:text-bg rounded transition-colors"
  >
    <span className="mx-3">{icon}</span>
    <span>{children}</span>
  </Link>
);

export default NavItem;
