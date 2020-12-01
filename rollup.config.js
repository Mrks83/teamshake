import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import commonjs from 'rollup-plugin-commonjs';
import progress from 'rollup-plugin-progress';

export default {
    input: 'src/index.js',
    output: {
        name: 'teamshake',
        file: 'dist/bundle.js',
        format: 'iife',
    },
    plugins: [
        resolve({
          jsnext: true,
          browser: true
        }),
        commonjs(),
        progress(),
        babel({
          exclude: 'node_modules/**',
        }),
        filesize({
          showGzippedSize: false,
        })
      ]
};
