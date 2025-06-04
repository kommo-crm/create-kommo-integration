import { defineConfig } from 'tsup';

import packageJson from './package.json';

export default defineConfig([
  {
    entry: ['./cli/index.ts', './cli/build.ts'],
    format: ['cjs'],
    target: 'node16',
    tsconfig: 'tsconfig.json',
    dts: false,
    sourcemap: false,
    clean: true,
    noExternal: Object.keys(packageJson.dependencies),
    splitting: false,
    minify: true,
    outDir: 'dist/cli',
    banner: {
      js: `/**
 * Copyright (c) QSOFT LLC.
 *
 * This source code is licensed under a custom license based
 * on MIT license found in the LICENSE file in the root
 * directory of this source tree.
 */`,
    },
  },
]);
