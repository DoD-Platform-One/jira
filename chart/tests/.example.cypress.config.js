const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://jira.dev.bigbang.mil',
    env: {
      url: 'http://jira.dev.bigbang.mil',
    },
    supportFile: false,
  },
  video: true,
})