import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1974&auto=format&fit=crop'
];

export default function HeaderHero({ onOpenModal }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.loop = true;
    if (playing) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  const title = useMemo(() => (
    <div className="relative z-10 text-center px-6">
      <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-[#B87333]/30 bg-[#FFFFF0]/60 backdrop-blur px-4 py-2 shadow-sm">
        <Icon name="lotus" className="w-5 h-5" stroke="#B87333" />
        <span className="text-sm tracking-wide font-medium text-[#8B4513]">Motivation Corner · Zen Edition</span>
      </div>
      <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#8B4513] drop-shadow-sm">
        Send Wishes to the Universe
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-[#4b3a2a]/80">
        Share an anonymous wish. Breathe in calm, breathe out doubt. Let your words drift across a serene horizon.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <button
          onClick={onOpenModal}
          className="group inline-flex items-center gap-2 rounded-full bg-[#B87333] text-[#FFFFF0] px-6 py-3 shadow-lg shadow-[#8B4513]/20 transition transform hover:-translate-y-0.5 hover:shadow-xl focus:outline-none"
        >
          <Icon name="send" className="w-5 h-5" stroke="#FFFFF0" />
          <span className="font-medium">Send a Wish</span>
        </button>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-2 rounded-full border border-[#B87333]/40 bg-[#FFFFF0]/70 px-4 py-3 text-[#8B4513] transition hover:bg-[#F5DEB3]/70"
          aria-label="Toggle ambient audio"
        >
          <Icon name={playing ? 'volume' : 'volumeX'} className="w-5 h-5" stroke="#8B4513" />
          <span className="hidden sm:inline text-sm font-medium">{playing ? 'Playing' : 'Muted'}</span>
        </button>
      </div>
    </div>
  ), [onOpenModal, playing]);

  return (
    <section className="relative overflow-hidden">
      {/* Background crossfade slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{
              backgroundImage: `url(${IMAGES[index]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
        {/* Soft gradient overlays for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#FFFFF0]/60 via-[#FFFFF0]/40 to-[#FFFFF0]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[linear-gradient(110deg,#B87333,rgba(248,250,252,0),#F5DEB3)] [background-size:200%_100%] animate-[shimmer_2.5s_linear_infinite]" />
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 sm:py-28 md:py-36">
        {title}
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src="https://cdn.pixabay.com/download/audio/2022/06/07/audio_7c4d8d9e46.mp3?filename=zen-garden-ambient-112199.mp3" />

      {/* Inline keyframes for shimmer + slow spin */}
      <style>
        {`
          @keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
          .animate-spin-slow { animation: spin 14s linear infinite; }
        `}
      </style>
    </section>
  );
}
