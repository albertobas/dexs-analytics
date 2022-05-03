const path = require('path');
const globalVars = require(path.join(__dirname, 'src', 'app', 'styles', 'global-vars.js'));
module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    }),
    require('postcss-simple-vars')({ variables: globalVars }),
    require('postcss-mixins')({
      mixinsDir: path.join(__dirname, 'src', 'app', 'styles', 'mixins'),
    }),
    require('postcss-custom-media')({
      importFrom: path.join(__dirname, 'src', 'app', 'styles', 'media-queries.css'),
    }),
  ],
};
