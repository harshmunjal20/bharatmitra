extend: {
  animation: {
    'scroll-x': 'scrollX 40s linear infinite',
  },
  keyframes: {
    scrollX: {
      '0%': { transform: 'translateX(0%)' },
      '100%': { transform: 'translateX(-50%)' }
    }
  }
}