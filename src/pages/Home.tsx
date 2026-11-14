import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function Home() {
  return (
    <section className="grid min-h-[75vh] items-center gap-10 md:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <span className="mb-4 inline-block rounded-full bg-brand/10 px-4 py-1 text-sm font-medium text-brand-dark">
          Realidade Aumentada educacional
        </span>
        <h1 className="text-4xl font-black leading-tight text-ink sm:text-6xl">
          Explore o Universo com a <span className="bg-gradient-to-r from-brand to-plum-300 bg-clip-text text-transparent">Pluto AR</span>
        </h1>
        <p className="mt-5 text-xl font-semibold text-ink-soft">
          Nunca foi tão fácil conhecer o universo.
          <br />
          Conheça mais através da Realidade Aumentada.
        </p>
        <Link to="/comecar" className="btn-primary pulse mt-8 text-lg">
          <Rocket size={20} /> Comece Agora
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex justify-center"
      >
        <img src="/Solarsystem.svg" alt="Ilustração do sistema solar" className="w-4/5 max-w-md animate-[float_6s_ease-in-out_infinite]" />
      </motion.div>
    </section>
  );
}

