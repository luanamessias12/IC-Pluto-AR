import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import PlatformLayout from './layouts/PlatformLayout';
import Home from './pages/Home';
import Comecar from './pages/Comecar';
import Educador from './pages/Educador';
import Contato from './pages/Contato';
import PlatformHome from './pages/platform/PlatformHome';
import Material from './pages/platform/Material';
import Regras from './pages/platform/Regras';
import Gameplay from './pages/platform/Gameplay';
import Catalogo from './pages/platform/Catalogo';
import Flashcard from './pages/platform/Flashcard';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/comecar" element={<Comecar />} />
          <Route path="/educador" element={<Educador />} />
          <Route path="/contato" element={<Contato />} />
        </Route>

        <Route path="/plataforma" element={<PlatformLayout />}>
          <Route index element={<PlatformHome />} />
          <Route path="material" element={<Material />} />
          <Route path="regras" element={<Regras />} />
        </Route>

        {/* Catálogo e flashcards (mesmas URLs do site antigo, sem .html) */}
        <Route path="/plataforma/gameplay" element={<Gameplay />} />
        <Route path="/plataforma/planetas" element={<Catalogo categoria="planeta" />} />
        <Route path="/plataforma/planetas/estrelas" element={<Catalogo categoria="estrela" />} />
        <Route path="/plataforma/planetas/satelites" element={<Catalogo categoria="satelite" />} />
        <Route path="/plataforma/planetas/flashcards/:cardId" element={<Flashcard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

