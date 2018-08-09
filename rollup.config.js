import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
    input: 'app/index.js',
    output: {
        file: 'dist/index.js',
        format: 'esm'
    },
    plugins: [
        nodeResolve(),
        commonjs()
    ]
};