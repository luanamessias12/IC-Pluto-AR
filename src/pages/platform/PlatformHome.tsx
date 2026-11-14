import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, Globe2, Orbit } from 'lucide-react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

function Tile({ to, href, icon: Icon, title, text, big }: { to?: string; href?: string; icon: LucideIcon; title: string; text: string; big?: boolean }) {
  const cls = `group block rounded-3xl bg-white p-6 text-center shadow-md transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl active:scale-95 ${big ? 'py-12' : ''}`;
  const body: ReactNode = (
    <>
      <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-plum-300 text-white transition group-hover:scale-110">
        <Icon size={28} />
      </span>
      <h2 className={`font-bold text-plum-300 ${big ? 'text-3xl' : 'text-xl'}`}>{title}</h2>
      <p className="mt-1 text-ink-soft">{text}</p>
    </>
  );
  // Rotas de RA/jogo são páginas estáticas (A-Frame / canvas) servidas pelo /public
  return href ? <a href={href} className={cls}>{body}</a> : <Link to={to!} className={cls}>{body}</Link>;
}

export default function PlatformHome() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl space-y-6">
      <Tile big href="/plataforma/solarsystem.html" icon={Orbit} title="Sistema Solar em 3D" text="Explore o sistema solar de forma interativa." />
      <div className="grid gap-6 md:grid-cols-2">
        <Tile to="/plataforma/planetas" icon={Globe2} title="Planetas" text="Conheça os planetas do nosso sistema solar." />
        <Tile to="/plataforma/gameplay" icon={Gamepad2} title="Gameplay" text="Veja como jogar e se divertir aprendendo." />
      </div>
    </motion.div>
  );
}

