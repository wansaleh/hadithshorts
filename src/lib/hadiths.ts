import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const hadithsDirectory = join(process.cwd(), '_hadiths');

export type Hadith = {
  slug: string;
  title: string;
  content: string;
  narrator: string;
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
    slug: realSlug,
    title: data.title,
    content,
    narrator: data.narrator,
    // excerpt: data.excerpt,
    // date: data.date,
  };
}

export function getAllHadiths(): Hadith[] {
  const slugs = getHadithSlugs();
  const hadiths = slugs.map((slug) => getHadithBySlug(slug));
  // sort hadiths by date in descending order
  // .sort((hadith1, hadith2) => (hadith1.date > hadith2.date ? -1 : 1));

  return hadiths;
}
