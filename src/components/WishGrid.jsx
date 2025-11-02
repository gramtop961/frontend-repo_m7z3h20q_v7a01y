import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';

function WishCard({ wish }) {
  const date = new Date(wish.createdAt);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35 }}
      className="group rounded-2xl border border-[#B87333]/20 bg-[#FFFFF0]/80 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition overflow-hidden"
    >
      <div className="absolute right-0 top-0 h-1 w-24 bg-gradient-to-r from-[#B87333] via-[#F5DEB3] to-transparent translate-x-6 group-hover:translate-x-0 transition-transform" />
      <p className="text-[#4b3a2a] leading-relaxed">{wish.text}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-[#8B4513]/70">
        <div className="inline-flex items-center gap-1.5">
          <Icon name="clock" className="w-4 h-4" stroke="#8B4513" />
          <span>{date.toLocaleString()}</span>
        </div>
        <span className="italic">Anonymous</span>
      </div>
    </motion.div>
  );
}

export default function WishGrid({ wishes }) {
  if (!wishes.length) {
    return (
      <div className="mt-10 text-center text-[#8B4513]/70">
        Your wish wall is empty. Be the first to share a gentle intention.
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <AnimatePresence>
        {wishes.map((w) => (
          <WishCard key={w.id} wish={w} />
        ))}
      </AnimatePresence>
    </div>
  );
}
