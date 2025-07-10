// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // adjust path as needed
  theme: {
    extend: {
      keyframes: {
        pop: {
          '0%': { transform: 'translateY(20%) scale(0.8)', opacity: '0' },
          '50%': { transform: 'translateY(-10%) scale(1.2)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        pop: 'pop 0.8s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
