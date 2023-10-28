const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.greatschools.org/school-district-boundaries-map',
  },
});
