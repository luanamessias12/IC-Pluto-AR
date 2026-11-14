import { Download } from 'lucide-react';

export default function Material() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-4 text-3xl font-bold text-plum-300">Material</h1>
      <div className="rounded-3xl bg-white p-8 shadow-md">
        <p className="mb-6 text-ink-soft">
          Aqui você encontrará todos os materiais de estudo e recursos para explorar o universo com a Pluto AR.
        </p>
        <a
          className="btn-primary"
          href="https://drive.google.com/drive/folders/1gSYojCAqvVNOxx_ELvvZ8cf3o6lBu0uc?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          <Download size={18} /> Baixar PDF
        </a>
      </div>
    </div>
  );
}

