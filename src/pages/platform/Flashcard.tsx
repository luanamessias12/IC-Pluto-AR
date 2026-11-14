import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Gamepad2, Orbit, X } from 'lucide-react';
import { categoriaTitulo, porCardId } from '../../data/corpos';

const backTo = { planeta: '/plataforma/planetas', estrela: '/plataforma/planetas/estrelas', satelite: '/plataforma/planetas/satelites' } as const;

export default function Flashcard() {
  const { cardId = '' } = useParams();
  const corpo = porCardId(cardId.replace(/\.html$/, ''));
  if (!corpo) return <Navigate to="/plataforma/planetas" replace />;

  return (
    <div className="min-h-screen bg-white">
      <header className="relative flex flex-col items-center bg-stars bg-cover bg-center px-6 pb-14 pt-10 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-plum-900/80 to-plum-600/70" />
        <Link to={backTo[corpo.categoria]} aria-label="Voltar" className="absolute right-6 top-6 z-10 text-white/90 transition duration-300 hover:rotate-90 hover:scale-110 hover:text-white">
          <X size={30} />
        </Link>
        <h1 className="relative text-2xl font-bold">{categoriaTitulo[corpo.categoria]}</h1>
        <motion.img
          key={corpo.slug}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          src={corpo.imagem}
          alt={corpo.nome}
          className="relative my-6 h-44 w-44 rounded-full border-4 border-white object-cover shadow-glow"
        />
        <div className="relative text-3xl font-bold uppercase tracking-wider">{corpo.nome}</div>
      </header>

      <section className="mx-auto -mt-8 max-w-2xl px-4">
        <div className="relative rounded-3xl bg-white p-8 text-center text-lg leading-relaxed text-ink-soft shadow-xl">
          <p>{corpo.descricao}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/plataforma/sistema-solar.html" className="btn-plum"><Orbit size={18} /> Sistema Solar</a>
            {/* Cena de RA (A-Frame) preservada como página estática */}
            <a href={corpo.ra} className="btn-plum"><Box size={18} /> 3D</a>
            <Link to="/plataforma/gameplay" className="btn-plum"><Gamepad2 size={18} /> GamePlay</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

