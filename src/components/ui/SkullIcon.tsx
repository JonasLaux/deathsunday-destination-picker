"use client";

export function SkullIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M32 4C18 4 8 16 8 28c0 8 4 15 10 19v9c0 1 1 2 2 2h4v-6h4v6h8v-6h4v6h4c1 0 2-1 2-2v-9c6-4 10-11 10-19C56 16 46 4 32 4z"
        fill="#FF2D2D"
        fillOpacity="0.9"
      />
      <ellipse cx="22" cy="26" rx="6" ry="7" fill="#0a0a0a" />
      <ellipse cx="42" cy="26" rx="6" ry="7" fill="#0a0a0a" />
      <path
        d="M28 38c0 0 2 3 4 3s4-3 4-3"
        stroke="#0a0a0a"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="22" cy="26" r="2.5" fill="#FF2D2D" opacity="0.6" />
      <circle cx="42" cy="26" r="2.5" fill="#FF2D2D" opacity="0.6" />
    </svg>
  );
}
