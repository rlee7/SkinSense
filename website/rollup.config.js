import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/main.js",
  output: {
    file: "public/bundle.js",
    format: "iife",
    sourcemap: true
  },
  plugins: [
    postcss({ extract: true }),
    resolve(),
    commonjs(),
    serve({ contentBase: "", port: 8080 }),
    livereload()
  ]
};

