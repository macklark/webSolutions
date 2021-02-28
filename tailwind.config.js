module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs' : '360px',
      'md' : '768px',
      'lg' : '1024px'
    },
    keyframes: {
      drop: {
        '0%' : {},
        '70%' : {transform: 'translateY(700px)'},
        '100%' : {transform: 'translateY(650px)'}
      }
    },
    animation: {
      drop: 'drop 3s ease-in-out'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
