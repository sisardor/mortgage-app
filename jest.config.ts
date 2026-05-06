import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

export default createJestConfig({
  testEnvironment: "jest-environment-jsdom",
  globals: { IS_REACT_ACT_ENVIRONMENT: true },
  sandboxInjectedGlobals: ['IS_REACT_ACT_ENVIRONMENT'],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
});