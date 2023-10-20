const plugin = require('tailwindcss/plugin')

/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
  theme: {
    colors: {
      black: '#000',
      transparent: 'transparent',
      red: '#f00',
      blue: '#00f',
      white: '#fff'
    },
    fontFamily: {
      sans: ['Suisse', "Suisse BP", "Suisse BP Int\\'l"]
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '12pt',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    // extends: {
    //   fontSize: {
    //     base: '12pt'
    //   }
    // }
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.basis-full': {
          'flex-basis': '100%',
          'width': '100%',
          'float': 'left'
        },
        '.basis-4--5': {
          'flex-basis': '80%',
          'width': '80%',
          'float': 'left'
        },
        '.basis-3--4': {
          'flex-basis': '75%',
          'width': '75%',
          'float': 'left'
        },
        '.basis-2--3': {
          'flex-basis': '66.6666%',
          'width': '66.6666%',
          'float': 'left'
        },
        '.basis-3--5': {
          'flex-basis': '60%',
          'width': '60%',
          'float': 'left'
        },
        '.basis-1--2': {
          'flex-basis': '50%',
          'width': '50%',
          'float': 'left'
        },
        '.basis-2--5': {
          'flex-basis': '40%',
          'width': '40%',
          'float': 'left'
        },
        '.basis-1--3': {
          'flex-basis': '33.3333%',
          'width': '33.3333%',
          'float': 'left'
        },
        '.basis-1--4': {
          'flex-basis': '25%',
          'width': '25%',
          'float': 'left'
        },
        '.basis-1--5': {
          'flex-basis': '20%',
          'width': '20%',
          'float': 'left'
        },
        '.height-0': {
          height: '0'
        },
        '.height-small': {
          height: '3rem'
        },
        '.height-medium': {
          height: '5rem'
        },
        '.height-large': {
          height: '9rem'
        },
        '.height-x-large': {
          height: '15rem'
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ]
}
