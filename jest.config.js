const { createCjsPreset } = require('jest-preset-angular/presets');

module.exports = {
  ...createCjsPreset(),
  setupFilesAfterEnv: [
    "./setup-jest.ts"
  ],
  coverageReporters: [
    "text",
    "html"
  ],
  testEnvironment: "jsdom",
};
