import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const config = {
  input: "src/output/index.js",
  output: {
    format: "umd",
    file: "src/output/content.js",
    name: "content",
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
};

export default config;
