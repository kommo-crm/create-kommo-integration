import path from 'path';

import fs from 'fs-extra';

/**
 * Normalize path for windows.
 */
const normalizePath = (p: string): string => {
  return p.replace(/\\/g, '/');
};

export async function removeDirFiltered(
  dir: string,
  filter: (filePath: string, stats: fs.Stats) => boolean
): Promise<void> {
  if (!(await fs.pathExists(dir))) {
    return;
  }

  const entries = await fs.readdir(dir);

  for (const entry of entries) {
    const entryPath = path.join(dir, entry);
    const stats = await fs.lstat(entryPath);

    if (stats.isDirectory()) {
      await removeDirFiltered(entryPath, filter);

      const stillExists = await fs.pathExists(entryPath);
      const isEmpty = (await fs.readdir(entryPath)).length === 0;

      if (stillExists && isEmpty && filter(normalizePath(entryPath), stats)) {
        await fs.remove(entryPath);
      }
    } else if (filter(normalizePath(entryPath), stats)) {
      await fs.remove(entryPath);
    }
  }
}
