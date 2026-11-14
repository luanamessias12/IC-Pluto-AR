import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Atom, GraduationCap, Smartphone } from 'lucide-react';

const beneficios = [
  { icon: Atom, texto: 'Conteúdos de astronomia em realidade aumentada' },
  { icon: GraduationCap, texto: 'Material para todos os níveis de ensino' },
  { icon: Smartphone, texto: 'Plataforma simples e acessível' },
];

export default function Educador() {
  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-4xl font-bold text-brand">Seja um Educador Parceiro</h1>
      <p className="mb-8 text-lg text-ink-soft">
        Na Pluto AR, oferecemos ferramentas e conteúdos interativos para transformar suas aulas em experiências imersivas.
      </p>
      <ul className="mb-10 grid gap-4 sm:grid-cols-3">
        {beneficios.map(({ icon: Icon, texto }) => (
          <li key={texto} className="rounded-2xl border border-fuchsia-100 bg-white/80 p-5 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-glow">
            <Icon className="mb-3 text-brand" size={32} />
            <span className="font-medium text-ink-soft">{texto}</span>
          </li>
        ))}
      </ul>
      <Link to="/" className="btn-primary">Voltar para Início</Link>
    </motion.section>
  );
}

