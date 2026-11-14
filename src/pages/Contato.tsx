import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Send, TriangleAlert } from 'lucide-react';

type Status = { tipo: 'idle' | 'loading' | 'ok' | 'erro'; msg?: string };

export default function Contato() {
  const [status, setStatus] = useState<Status>({ tipo: 'idle' });

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = { name: fd.get('name'), email: fd.get('email'), message: fd.get('message') };
    setStatus({ tipo: 'loading' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setStatus({ tipo: 'ok', msg: 'Mensagem enviada com sucesso!' });
        form.reset();
      } else {
        setStatus({ tipo: 'erro', msg: json.error ?? 'Erro ao enviar.' });
      }
    } catch {
      setStatus({ tipo: 'erro', msg: 'Não foi possível conectar ao servidor.' });
    }
  }

  return (
    <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-4xl font-bold text-brand">Entre em Contato</h1>
      <p className="mb-6 text-lg text-ink-soft">
        Ficaremos felizes em ouvir você! Preencha o formulário abaixo ou envie um e-mail para{' '}
        <strong>contato@plutoar.com</strong>.
      </p>
      <form onSubmit={enviar} className="flex flex-col gap-4 rounded-3xl border border-fuchsia-100 bg-white/80 p-6 shadow-sm backdrop-blur">
        <input className="input" name="name" placeholder="Seu Nome" required />
        <input className="input" name="email" type="email" placeholder="Seu E-mail" required />
        <textarea className="input" name="message" rows={4} placeholder="Sua Mensagem" required />
        <button className="btn-primary self-start disabled:opacity-60" disabled={status.tipo === 'loading'}>
          <Send size={18} /> {status.tipo === 'loading' ? 'Enviando...' : 'Enviar'}
        </button>
        {status.tipo === 'ok' && (
          <p role="status" className="flex items-center gap-2 text-green-700"><CheckCircle2 size={18} /> {status.msg}</p>
        )}
        {status.tipo === 'erro' && (
          <p role="alert" className="flex items-center gap-2 text-red-600"><TriangleAlert size={18} /> {status.msg}</p>
        )}
      </form>
      <Link to="/" className="mt-6 inline-block font-medium text-brand hover:underline">Voltar para Início</Link>
    </motion.section>
  );
}

