// jest.config.mjs

// Usar 'import' em vez de 'require'
import { createDefaultPreset } from "ts-jest";

// O código não precisa de ser alterado, pois já estava a usar a sintaxe limpa
const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const jestConfig = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg, 
  },
  // Adicione outras configurações do Jest aqui, se necessário
};

// Usar 'export default' em vez de 'module.exports'
export default jestConfig;