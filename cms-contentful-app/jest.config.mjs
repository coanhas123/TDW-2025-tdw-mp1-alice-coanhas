// jest.config.js (CommonJS)

// Usa require() em vez de import
const { createDefaultPreset } = require("ts-jest");

// Chama a função e extrai 'transform'
const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const jestConfig = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};

// Usa module.exports em vez de export default
module.exports = jestConfig;