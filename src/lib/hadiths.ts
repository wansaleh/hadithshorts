import fg from 'fast-glob';
import fs from 'fs';
import matter from 'gray-matter';
import { orderBy, shuffle, uniq } from 'lodash-es';
import { join } from 'path';

const hadithsDirectory = join(process.cwd(), '_hadiths');

export enum HadithStatus {
  Sahih = 'Sahih',
  Daif = 'Daif',
}
export type Hadith = {
  number?: number;
  slug: string;
  title: string;
  content: string;
  narrators: string[];
  topics: string[];
  // excerpt?: string;
  date: string;
  status?: HadithStatus;
};
export type Topic = {
  topic: string;
  count: number;
};
export type Narrator = {
  name: string;
  count: number;
};

function getAllHadithFiles() {
  // console.log(fs.readdirSync(hadithsDirectory));
  return fg.sync(hadithsDirectory + '/**/*.md', {
    onlyFiles: true,
  });
}

function getHadithByPath(fullPath: string): Hadith {
  const slug = fullPath.replace(
    new RegExp(`^${hadithsDirectory}/|.md$`, 'g'),
    ''
  );
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const fileStats = fs.statSync(fullPath);
  const { data, content } = matter(fileContents);

  return {
    number: data.number ?? null,
    slug,
    title: data.title,
    content: content.trim(),
    narrators: data.narrators,
    topics: data.topics ?? null,
    date: fileStats.mtime.toISOString(),
    status: data.status,
  };
}

export function getAllHadiths(): Hadith[] {
  const files = getAllHadithFiles();
  const hadiths = files.map((slug) => getHadithByPath(slug));

  return shuffle(hadiths);
  // return orderBy(hadiths, 'date', 'desc');
}

export function getAllNarrators(): Narrator[] {
  const hadiths = getAllHadiths();

  const _narrators: string[] = uniq(
    hadiths
      .map((hadith: Hadith) => hadith.narrators)
      .filter(Boolean)
      .flat()
  );

  const narrators: Narrator[] = [];
  _narrators.forEach((narrator) => {
    const count = hadiths.filter((hadith) =>
      hadith.narrators.includes(narrator)
    ).length;

    narrators.push({ name: narrator, count });
  });

  return orderBy(narrators, 'count', 'desc');
}

export function getAllTopics(): Topic[] {
  const hadiths = getAllHadiths();

  const _topics: string[] = uniq(
    hadiths
      .map((hadith: Hadith) => hadith.topics)
      .filter(Boolean)
      .flat()
  );

  const topics: Topic[] = [];
  _topics.forEach((topic) => {
    const count = hadiths.filter((hadith) =>
      hadith.topics.includes(topic)
    ).length;

    topics.push({ topic, count });
  });

  return orderBy(topics, 'count', 'desc');
}
