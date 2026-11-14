import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';

interface PlanetInfo {
  name: string;
  src: string;
  size: number;
}

const planetConfigs: PlanetInfo[] = [
  { name: 'Mercúrio', src: '/game/mercuriogame.png', size: 30 },
  { name: 'Vênus', src: '/game/venusgame.png', size: 40 },
  { name: 'Terra', src: '/game/terragame.png', size: 45 },
  { name: 'Marte', src: '/game/martegame.png', size: 35 },
  { name: 'Júpiter', src: '/game/jupitergame.png', size: 80 },
  { name: 'Saturno', src: '/game/saturnogame.png', size: 70 },
  { name: 'Urano', src: '/game/uranogame.png', size: 60 },
  { name: 'Netuno', src: '/game/netunogame.png', size: 60 },
];

export default function Gameplay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'running' | 'gameover'>('idle');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = gameState === 'running';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Carregamento de imagens seguras
    const bgImg = new Image();
    bgImg.src = '/img/fundo_estrelado.jpg';

    const astronautImg = new Image();
    astronautImg.src = '/astrogame.png';

    const asteroidImg = new Image();
    asteroidImg.src = '/asteroidegame.png';

    const loadedPlanets = planetConfigs.map((p) => {
      const img = new Image();
      img.src = p.src;
      return { ...p, img };
    });

    const isReady = (img: HTMLImageElement) => img && img.complete && img.naturalWidth > 0;

    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const player = {
      x: 100,
      y: canvas.height / 2,
      w: 60,
      h: 60,
      speed: isMobile ? 6 : 9,
    };

    interface Asteroid {
      x: number;
      y: number;
      w: number;
      h: number;
      speed: number;
    }

    interface ActivePlanet {
      x: number;
      y: number;
      w: number;
      h: number;
      speed: number;
      img: HTMLImageElement;
    }

    let asteroids: Asteroid[] = [];
    let planets: ActivePlanet[] = [];
    let currentScore = 0;
    let frame = 0;

    const spawnAsteroid = () => {
      const type = Math.floor(Math.random() * 3);
      const size = 30 + type * 20;
      asteroids.push({
        x: canvas.width,
        y: Math.random() * (canvas.height - size),
        w: size,
        h: size,
        speed: (isMobile ? 3 : 5) + Math.random() * 2,
      });
    };

    const spawnPlanet = () => {
      const p = loadedPlanets[Math.floor(Math.random() * loadedPlanets.length)];
      planets.push({
        x: canvas.width,
        y: Math.random() * (canvas.height - p.size),
        w: p.size,
        h: p.size,
        speed: isMobile ? 2.5 : 4,
        img: p.img,
      });
    };

    const draw = () => {
      // Fundo
      if (isReady(bgImg)) {
        ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = '#060012';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Asteroides
      asteroids.forEach((a) => {
        if (isReady(asteroidImg)) {
          ctx.drawImage(asteroidImg, a.x, a.y, a.w, a.h);
        } else {
          ctx.fillStyle = '#888';
          ctx.beginPath();
          ctx.arc(a.x + a.w / 2, a.y + a.h / 2, a.w / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Planetas
      planets.forEach((p) => {
        if (isReady(p.img)) {
          ctx.drawImage(p.img, p.x, p.y, p.w, p.h);
        } else {
          ctx.fillStyle = '#d946ef';
          ctx.beginPath();
          ctx.arc(p.x + p.w / 2, p.y + p.h / 2, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Jogador (Astronauta)
      if (isReady(astronautImg)) {
        ctx.drawImage(astronautImg, player.x, player.y, player.w, player.h);
      } else {
        ctx.fillStyle = '#fff';
        ctx.fillRect(player.x, player.y, player.w, player.h);
      }
    };

    const update = () => {
      frame++;
      if (frame % 90 === 0) spawnAsteroid();
      if (frame % 150 === 0) spawnPlanet();

      asteroids.forEach((a) => (a.x -= a.speed));
      planets.forEach((p) => (p.x -= p.speed));

      asteroids = asteroids.filter((a) => a.x + a.w > 0);
      planets = planets.filter((p) => p.x + p.w > 0);

      // Colisão com asteroides -> Game Over
      for (const a of asteroids) {
        if (
          player.x < a.x + a.w &&
          player.x + player.w > a.x &&
          player.y < a.y + a.h &&
          player.y + player.h > a.y
        ) {
          isRunning = false;
          setGameState('gameover');
          return;
        }
      }

      // Coleta de planetas -> Pontos
      planets.forEach((p, i) => {
        if (
          player.x < p.x + p.w &&
          player.x + player.w > p.x &&
          player.y < p.y + p.h &&
          player.y + player.h > p.y
        ) {
          currentScore++;
          setScore(currentScore);
          planets.splice(i, 1);
        }
      });
    };

    const loop = () => {
      if (!isRunning) return;
      update();
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    if (isRunning) {
      loop();
    } else {
      // Desenho de frame inicial ou congelado
      draw();
    }

    // Controles
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isRunning) return;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        player.y = Math.max(0, player.y - player.speed * 4);
      }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        player.y = Math.min(canvas.height - player.h, player.y + player.speed * 4);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isRunning) return;
      player.y = Math.max(0, Math.min(canvas.height - player.h, e.clientY - player.h / 2));
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isRunning || e.touches.length === 0) return;
      player.y = Math.max(0, Math.min(canvas.height - player.h, e.touches[0].clientY - player.h / 2));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [gameState]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black select-none">
      {/* HUD Superior */}
      <div className="fixed left-6 top-6 z-30 flex items-center gap-4">
        <Link
          to="/plataforma"
          className="flex items-center gap-2 rounded-full bg-plum-800/80 px-4 py-2 font-medium text-white backdrop-blur transition hover:scale-105 hover:bg-plum-700"
        >
          <ArrowLeft size={18} /> Plataforma
        </Link>
        <div className="rounded-2xl border border-brand/30 bg-plum-900/80 px-5 py-2 text-xl font-bold text-white shadow-glow backdrop-blur">
          Pontos: <span className="text-brand">{score}</span>
        </div>
      </div>

      {/* Dica de controle */}
      <div className="fixed bottom-6 right-6 z-30 hidden rounded-xl bg-black/60 px-4 py-2 text-sm text-gray-300 backdrop-blur sm:block">
        Mova o mouse, toque na tela ou use as teclas ↑ / ↓
      </div>

      {/* Telas de Início / Game Over */}
      {gameState === 'idle' && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="mx-4 flex max-w-md flex-col items-center rounded-3xl border border-brand/40 bg-plum-900/90 p-8 text-center text-white shadow-glow">
            <h1 className="text-3xl font-black text-brand">Gameplay Astronauta</h1>
            <p className="mt-3 text-gray-200">
              Colete planetas para pontuar e desvie de todos os asteroides espaciais!
            </p>
            <button
              onClick={() => {
                setScore(0);
                setGameState('running');
              }}
              className="btn-primary pulse mt-6 text-lg"
            >
              <Play size={20} /> Iniciar Jogo
            </button>
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm">
          <div className="mx-4 flex max-w-md flex-col items-center rounded-3xl border border-red-500/40 bg-plum-900/90 p-8 text-center text-white shadow-glow">
            <h2 className="text-3xl font-black text-red-400">Fim de Jogo!</h2>
            <p className="mt-2 text-lg text-gray-200">
              Sua pontuação final:{' '}
              <span className="font-bold text-brand">{score} planetas</span>
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  setScore(0);
                  setGameState('running');
                }}
                className="btn-primary"
              >
                <RotateCcw size={18} /> Jogar Novamente
              </button>
              <Link to="/plataforma" className="btn-plum">
                Voltar à Plataforma
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Canvas */}
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

