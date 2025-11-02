import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from './Icon';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishFormModal({ open, onClose, onAddWish }) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const max = 500;
  const remaining = max - text.length;
  const textareaRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => textareaRef.current?.focus(), 50);
    } else {
      setText('');
      setSubmitting(false);
    }
  }, [open]);

  const disabled = submitting || text.trim().length === 0 || text.length > max;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;
    setSubmitting(true);
    const wish = {
      id: crypto.randomUUID(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    onAddWish(wish);
    setSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/30" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full sm:max-w-lg mx-auto m-0 sm:m-4 rounded-t-2xl sm:rounded-2xl bg-[#FFFFF0] border border-[#B87333]/20 shadow-2xl overflow-hidden"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 240 }}
          >
            <div className="px-5 sm:px-6 py-4 border-b border-[#B87333]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="lotus" className="w-5 h-5" stroke="#8B4513" />
                <h3 className="font-serif font-semibold text-[#8B4513] text-lg">Share a Wish</h3>
              </div>
              <button
                onClick={onClose}
                className="rounded-full px-3 py-1.5 text-[#8B4513] hover:bg-[#F5DEB3]/60"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-5 sm:px-6 py-5">
              <label htmlFor="wish" className="sr-only">Your wish</label>
              <textarea
                id="wish"
                ref={textareaRef}
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, max))}
                placeholder="May peace, health, and happiness flow to..."
                className="w-full h-40 resize-none rounded-xl border border-[#B87333]/30 bg-white/80 p-4 text-[#4b3a2a] placeholder-[#8B4513]/50 focus:outline-none focus:ring-2 focus:ring-[#8FBC8F] focus:border-transparent"
                maxLength={max}
              />

              <div className="mt-4 flex items-center justify-between">
                <span className={`text-sm ${remaining < 40 ? 'text-[#B87333]' : 'text-[#8B4513]/70'}`}>{remaining} characters left</span>
                <button
                  type="submit"
                  disabled={disabled}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#8FBC8F] text-[#0b3d2e] font-medium px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#8FBC8F]/30 hover:shadow-lg transition"
                >
                  <Icon name="send" className="w-5 h-5" stroke="#0b3d2e" />
                  <span>{submitting ? 'Sending…' : 'Send'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
