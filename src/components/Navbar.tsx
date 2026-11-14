import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/educador', label: 'Educador' },
  { to: '/contato', label: 'Contato' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `font-medium transition-colors hover:text-brand ${isActive ? 'text-brand' : 'text-ink-soft'}`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/70 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link to="/" aria-label="Pluto AR - início" onClick={() => setOpen(false)}>
          <img src="/logo.jpeg" alt="Logomarca Pluto AR" className="h-12 w-12 rounded-full object-cover ring-2 ring-brand/30" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
          <Link to="/comecar" className="btn-primary !py-2">Começar</Link>
        </div>

        <button
          className="rounded-lg p-2 text-ink-soft md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col items-center gap-4 px-6 pb-6 pt-2">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setOpen(false)}>
                  {l.label}
                </NavLink>
              ))}
              <Link to="/comecar" className="btn-primary" onClick={() => setOpen(false)}>Começar</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

