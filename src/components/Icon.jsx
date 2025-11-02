import React from 'react';

// Minimal custom SVG icon set (Heroicons-style strokes)
// Available names: lotus, send, volume, volumeX, clock
export default function Icon({ name = 'lotus', className = 'w-6 h-6', stroke = '#B87333' }) {
  if (name === 'send') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 2L11 13" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (name === 'volume') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 5L6 9H3V15H6L11 19V5Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 9C16.3333 10.3333 16.3333 13.6667 15 15" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 6C20.6667 8.66667 20.6667 15.3333 18 18" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (name === 'volumeX') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 5L6 9H3V15H6L11 19V5Z" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 10L20 14" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 10L16 14" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (name === 'clock') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.5"/>
        <path d="M12 7V12L15 14" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  // lotus (default)
  return (
    <svg className={className + ' animate-spin-slow'} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 6C26 14 26 22 32 28C38 22 38 14 32 6Z"/>
        <path d="M12 18C16 28 22 32 32 32C22 32 16 36 12 46C6 36 6 28 12 18Z"/>
        <path d="M52 18C48 28 42 32 32 32C42 32 48 36 52 46C58 36 58 28 52 18Z"/>
        <path d="M32 58C38 50 38 42 32 36C26 42 26 50 32 58Z"/>
      </g>
    </svg>
  );
}

// Tailwind extension: slow spin
// Add keyframes via inline style in components where needed if not present globally.
