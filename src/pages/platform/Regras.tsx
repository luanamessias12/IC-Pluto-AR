import { Rocket, Star, Skull, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const regras = [
  { icon: Rocket, texto: 'Ajude o astronauta a atravessar o espaço e passar pelos planetas.' },
  { icon: Star, texto: 'Cada vez que o astronauta alcançar um planeta, você ganha 1 ponto.' },
  { icon: Skull, texto: 'Evite os asteroides: se o astronauta colidir com algum, é game over.' },
  { icon: Trophy, texto: 'Tente marcar o maior número de pontos possível!' },
];

export default function Regras() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-3xl font-bold text-plum-300">Regras do Game</h1>
      <p className="mb-6 text-ink-soft">Antes de começar, leia atentamente as regras para garantir uma experiência divertida.</p>
      <ul className="space-y-3">
        {regras.map(({ icon: Icon, texto }) => (
          <li key={texto} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand"><Icon size={22} /></span>
            <span className="text-ink-soft">{texto}</span>
          </li>
        ))}
      </ul>
      <Link to="/plataforma/gameplay" className="btn-primary mt-8">Jogar agora</Link>
    </div>
  );
}

