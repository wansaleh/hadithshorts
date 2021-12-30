import fg from 'fast-glob';
import fs from 'fs';
import matter from 'gray-matter';
import { orderBy, uniq } from 'lodash-es';
import { join } from 'path';

const hadithsDirectory = join(process.cwd(), '_hadiths');

export type Hadith = {
  number: number;
  slug: string;
  title: string;
  content: string;
  narrator: string;
  topics: string[];
  // excerpt?: string;
  // date: string;
};
export type Topic = { topic: string; count: number };

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
  const { data, content } = matter(fileContents);

  return {
    number: data.number,
    slug,
    title: data.title,
    content,
    narrator: data.narrator,
    topics: data.topics ?? null,
    // excerpt: data.excerpt,
    // date: data.date,
  };
}

export function getAllHadiths(): Hadith[] {
  const files = getAllHadithFiles();
  const hadiths = files.map((slug) => getHadithByPath(slug));

  return hadiths;
  // return orderBy(hadiths, 'number', 'asc');
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
