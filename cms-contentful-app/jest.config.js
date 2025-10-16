import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const jestConfig = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};

export default jestConfig;
