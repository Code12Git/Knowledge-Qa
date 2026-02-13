import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
        location.pathname === to
          ? "text-indigo-600 bg-indigo-50"
          : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="7" fill="#6366f1" />
            <path d="M7 9h14M7 14h10M7 19h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-xl font-bold text-slate-800">KnowledgeQA</span>
        </Link>
        <nav className="flex items-center gap-1">
          {navLink("/", "Home")}
          {navLink("/workspace", "Workspace")}
          {navLink("/status", "Status")}
        </nav>
      </div>
    </header>
  );
}

export default Header;
