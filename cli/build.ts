import path from 'path';

import fsExtra from 'fs-extra';
import ignore from 'ignore';

const projectRoot = path.resolve(__dirname, '../../');
const distDir = path.resolve(projectRoot, 'dist');

/**
 * tsc will only compile the files that are referenced in tsconfig.json,
 * so we'll copy all needed  dist directory
 */
const filesToCopy = [
  '.gitignore',
  'README.md',
  'package.json',
  'cli/locales',
  'templates',
];

const gitignorePath = path.join(projectRoot, '.gitignore');

const gitignoreContent = fsExtra.readFileSync(gitignorePath, 'utf8');
const ig = ignore().add(gitignoreContent);

filesToCopy.forEach((item) => {
  const src = path.resolve(projectRoot, item);
  const dest = path.resolve(distDir, item);

  try {
    fsExtra.copySync(src, dest, {
      overwrite: true,
      filter: (filePath: string) => {
        const relative = path.relative(projectRoot, filePath);

        if (!relative) {
          return true;
        }

        return !ig.ignores(relative);
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Failed to copy ${src} → ${dest}:`, err);
    } else {
      console.error(`Unknown error copying ${src} → ${dest}:`, err);
    }
  }
});
