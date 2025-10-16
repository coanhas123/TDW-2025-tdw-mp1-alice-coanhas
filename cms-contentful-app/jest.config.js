// jest.config.mjs
import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const jestConfig = {
  testEnvironment: "node",
  transform: {
    // Linha 13: Certifique-se de que está limpa.
    ...tsJestTransformCfg, 
  }, // <--- NENHUMA vírgula aqui se for a última propriedade
};

export default jestConfig;