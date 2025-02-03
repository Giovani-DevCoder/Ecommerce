const path = require('path');

module.exports = {
  // Tu configuración de Webpack
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'), // Alias para src
    },
  },
  // Resto de la configuración de Webpack
};
