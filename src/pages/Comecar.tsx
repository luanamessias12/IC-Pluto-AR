import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Comecar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex max-w-xl flex-col items-center py-8 text-center"
    >
      <h1 className="text-4xl font-bold text-brand">Vamos Começar!</h1>
      <img src="/nautacomecar.svg" alt="Astronauta" className="my-8 w-full max-w-xs" />
      <p className="mb-8 text-lg text-ink-soft">Explore o universo em realidade aumentada agora mesmo.</p>
      <Link to="/plataforma" className="btn-primary pulse text-lg">Vamos Começar</Link>
    </motion.section>
  );
}

