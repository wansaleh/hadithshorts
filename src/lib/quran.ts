import fs from 'fs';
import { join } from 'path';

const parentDir = join(process.cwd());

export function getQuranPage(page: number): string[] {
  const fileContents = fs.readFileSync(parentDir + '/mushaf.txt', 'utf8');
  const allLines = fileContents.split('\n');

  const lines = allLines
    .filter((line) => line.startsWith(page + ','))
    .map((line) => line.split(',')[1].trim());

  return lines;
}
