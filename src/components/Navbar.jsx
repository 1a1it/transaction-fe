import { Link } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { label: "All Transactions", to: "/transactions" },
    { label: "Transaction by ID", to: "/transaction-by-id" },
    { label: "Transaction Status", to: "/update-transaction" },
  ];

  return (
    <nav className="bg-gray-100 p-4 shadow-sm">
      <ul className="flex gap-6">
        {navLinks.map((link) => (
          <li key={link.to} className="relative group">
            <Link
              to={link.to}
              className="relative z-10 px-3 py-1 font-medium text-blue-600 hover:text-blue-800"
            >
              {link.label}
            </Link>
            <span
              className="absolute inset-0 bg-gray-300 scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0"
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
