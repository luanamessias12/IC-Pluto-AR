import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { categoriaTitulo, porCategoria, type Categoria } from '../../data/corpos';

const tabs: { to: string; label: string }[] = [
  { to: '/plataforma/planetas', label: 'Planetas' },
  { to: '/plataforma/planetas/estrelas', label: 'Estrelas' },
  { to: '/plataforma/planetas/satelites', label: 'Satélites' },
];

export default function Catalogo({ categoria }: { categoria: Categoria }) {
  const itens = porCategoria(categoria);
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between bg-gradient-to-r from-plum-600 to-plum-700 px-6 py-4 shadow-md">
        <ul className="flex flex-wrap gap-6">
          {tabs.map((t) => (
            <li key={t.to}>
              <NavLink
                to={t.to}
                end
                className={({ isActive }) =>
                  `inline-block text-lg font-semibold transition duration-300 hover:-translate-y-0.5 active:scale-95 ${isActive ? 'text-white underline decoration-2 underline-offset-8' : 'text-white/80 hover:text-white'}`
                }
              >
                {t.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to="/plataforma" aria-label="Sair" className="text-white transition duration-300 hover:rotate-90 hover:scale-110 hover:text-plum-900"><X size={28} /></Link>
      </nav>

      <h1 className="mt-8 text-center text-3xl font-bold text-plum-600">{categoriaTitulo[categoria]}</h1>

      <div className="mx-auto my-8 grid max-w-5xl gap-6 p-4 sm:grid-cols-2 lg:grid-cols-4">
        {itens.map((c, i) => (
          <motion.div key={c.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link
              to={`/plataforma/planetas/flashcards/${c.cardId}`}
              className="group relative flex h-56 items-center justify-center overflow-hidden rounded-2xl border-2 border-plum-700 shadow-lg transition duration-300 hover:scale-105 hover:shadow-glow"
            >
              <img src={c.imagem} alt={c.nome} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="relative text-xl font-bold uppercase tracking-wide text-white drop-shadow">{c.nome}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

