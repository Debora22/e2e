const useJimpex = require('projext-plugin-webpack/jimpex');
const App = require('./app');
// Instance the app but don't boot it.
const devApp = new App(false);
// Disable TLS validation for development.
devApp.disableTLSValidation();
// Implement the bundling middleware.
useJimpex(devApp, 'browser', 'gateway');
// Boot the app.
devApp.boot();
// Start the app.
devApp.start();
