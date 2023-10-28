const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(args) {
          console.log(...args);
          return null;
        }
      });
    },
    baseUrl: 'https://www.greatschools.org/school-district-boundaries-map',
  },
});
