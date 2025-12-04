import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import copy from 'rollup-plugin-copy';

const isProd = process.env.NODE_ENV === 'production';

export default {
  input: {
    script: 'src/js/script.js',
    gallery: 'src/js/gallery.js',
    projects: 'src/js/projects.js',
    digital: 'src/js/digital.js',
  },
  output: {
    dir: 'dist/js',
    format: 'es',
    sourcemap: !isProd,
    entryFileNames: '[name].js',
  },
  plugins: [
    nodeResolve({
      browser: true,
    }),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: /node_modules/,
      extensions: ['.js'],
    }),
    copy({
      targets: [{ src: 'src/js/gallery/*.js', dest: 'dist/js/gallery' }],
    }),
    isProd && terser(),
  ],
};
