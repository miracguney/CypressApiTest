const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',

  video: true,
  reporterOptions: {
    reportDir: 'reports/mochawesome',
    overwrite: false,
    html: false,
    json: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      // additional setup if needed
    },
    baseUrl: 'https://petstore.swagger.io/v2',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
