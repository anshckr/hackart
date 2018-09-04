module.exports = ({ file, options, env }) => ({
  sourceMap: true,
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 3,
      browsers: ['last 2 versions', '> 5%']
    },
    'cssnano': env === 'production' ? {} : false
  }
})
