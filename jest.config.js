
// eslint-disable-next-line no-undef
globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: 'tsconfig.spec.json',
};

module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "./setup-jest.ts"
  ],
  coverageReporters: [
    "text",
    "html"
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|js|html)$": 'jest-preset-angular',
  }
};
