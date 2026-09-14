import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/** eslint-config-next 16 ya publica configuración plana; no hace falta FlatCompat. */
const config = [
  { ignores: [".next/**", "node_modules/**", "_mockup/**"] },
  ...coreWebVitals,
  ...typescript,
];

export default config;
