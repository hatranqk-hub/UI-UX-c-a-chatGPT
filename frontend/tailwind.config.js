module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6'
      },
      animation: {
        'bounce': 'bounce 1s infinite',
        'spin': 'spin 1s linear infinite'
      }
    }
  },
  plugins: []
};
