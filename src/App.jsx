import React, { useEffect, useMemo, useState } from 'react';
import HeaderHero from './components/HeaderHero';
import WishFormModal from './components/WishFormModal';
import WishGrid from './components/WishGrid';

function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [wishes, setWishes] = useLocalStorage('zen-wishes', []);

  const handleAddWish = (wish) => {
    setWishes((prev) => [wish, ...prev]);
  };

  const header = useMemo(() => (
    <HeaderHero onOpenModal={() => setModalOpen(true)} />
  ), []);

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      {header}

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20">
        <section className="rounded-3xl border border-[#B87333]/20 bg-white/70 backdrop-blur px-5 sm:px-8 py-8 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#8B4513]">Wish Wall</h2>
              <p className="mt-1 text-sm text-[#8B4513]/70">Flowing intentions from the community. New wishes gently fade in.</p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="hidden sm:inline-flex items-center rounded-full bg-[#B87333] text-[#FFFFF0] px-4 py-2 shadow hover:-translate-y-0.5 transition"
            >
              Write a Wish
            </button>
          </div>

          <WishGrid wishes={wishes} />
        </section>
      </main>

      <WishFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddWish={handleAddWish}
      />

      <footer className="px-4 pb-10 text-center text-xs text-[#8B4513]/60">
        Crafted with calm • Wood Brown, Copper Gold, Cream Gold, Moss Green, Ivory White
      </footer>
    </div>
  );
}
