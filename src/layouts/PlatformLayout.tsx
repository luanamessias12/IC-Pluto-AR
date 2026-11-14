import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { BookOpen, Gamepad2, Home, LogOut, Menu, ScrollText, X } from 'lucide-react';

const items = [
  { to: '/plataforma', label: 'Home', icon: Home, end: true },
  { to: '/plataforma/material', label: 'Material', icon: BookOpen },
  { to: '/plataforma/regras', label: 'Regras do Game', icon: ScrollText },
];

export default function PlatformLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <button
        className="fixed left-4 top-4 z-50 rounded-xl bg-plum-500 p-2 text-white shadow-lg transition duration-300 hover:scale-110 active:scale-90 md:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
      >
        {open ? <X /> : <Menu />}
      </button>

      {open && <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-gradient-to-b from-plum-500 to-plum-800 p-6 text-white transition-transform duration-300 md:static md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Link to="/plataforma" className="mb-10 flex items-center gap-3">
          <img src="/logo.jpeg" alt="" className="h-10 w-10 rounded-full object-cover" />
          <span className="text-xl font-bold">Pluto AR</span>
        </Link>
        <nav className="flex flex-col gap-1">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 transition duration-300 hover:translate-x-1.5 active:scale-95 ${
                  isActive ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
                }`
              }
            >
              <Icon size={20} /> {label}
            </NavLink>
          ))}
          <Link
            to="/plataforma/gameplay"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition duration-300 hover:translate-x-1.5 hover:bg-white/10 active:scale-95"
          >
            <Gamepad2 size={20} /> Jogar
          </Link>
        </nav>
        <Link
          to="/"
          className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 font-semibold text-plum-500 transition duration-300 hover:scale-105 hover:bg-gray-200 active:scale-95"
        >
          <LogOut size={18} /> Sair
        </Link>
      </aside>

      <main className="flex-1 px-6 pb-10 pt-20 md:px-10 md:pt-10">
        <Outlet />
      </main>
    </div>
  );
}

