module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    media: false, // or 'media' or 'class'
    theme: {
      extend: {
        backgroundImage:{
          'homer': "url('/Homefont.jpg')",
          'homerdos' :"url('/Homefont2.jpg')"

        },
        animation: {
          'glide-in' : 'glideIn 0.5s ease-out 0.5s forwards'
        },
        keyframes:{
          glideIn:{
            '0%':{transform: 'translateY(-15%)', opacity:'0'},
            '100%':{transform: 'translateY(0)', opacity: '1'}

          }
        },
        
          boxShadow: {
            'orange-glow': '0px 4px 10px #f97316',
          },
      
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
}