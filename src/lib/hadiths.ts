import fs from 'fs';
import matter from 'gray-matter';
import { orderBy } from 'lodash-es';
import { join } from 'path';

const hadithsDirectory = join(process.cwd(), '_hadiths');

export type Hadith = {
  number: number;
  slug: string;
  title: string;
  content: string;
  narrator: string;
  topics?: string[];
  // excerpt?: string;
  // date: string;
};

export function getHadithSlugs() {
  return fs.readdirSync(hadithsDirectory);
}

export function getHadithBySlug(slug: string): Hadith {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(hadithsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    number: data.number,
    slug: realSlug,
    title: data.title,
    content,
    narrator: data.narrator,
    topics: data.topics ?? null,
    // excerpt: data.excerpt,
    // date: data.date,
  };
}

export function getAllHadiths(): Hadith[] {
  const slugs = getHadithSlugs();
  const hadiths = slugs.map((slug) => getHadithBySlug(slug));

  return orderBy(hadiths, 'number', 'asc');
}
