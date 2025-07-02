extend: {
  animation: {
    wiggle: 'wiggle 1.5s infinite',
  },
  keyframes: {
    wiggle: {
      '0%, 100%': { transform: 'rotate(-3deg)' },
      '50%': { transform: 'rotate(3deg)' },
    },
  },
}

theme: {
  extend: {
    animation: {
      'glow': 'glowPulse 2s infinite ease-in-out',
    },
    keyframes: {
      glowPulse: {
        '0%, 100%': { boxShadow: '0 0 20px rgba(220,38,38,0.5)' },
        '50%': { boxShadow: '0 0 40px rgba(220,38,38,0.8)' },
      },
    },
  },
}
