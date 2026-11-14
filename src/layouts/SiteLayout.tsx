import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function SiteLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-fuchsia-50/60 to-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 rounded-full bg-plum-300/10 blur-3xl" />
      <Navbar />
      <main className="relative mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
      <footer className="relative py-8 text-center text-sm text-ink-soft">
        © {new Date().getFullYear()} Pluto AR — Explore o universo com Realidade Aumentada
      </footer>
    </div>
  );
}

