// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Directus } from '@directus/sdk';
import { NextApiRequest, NextApiResponse } from 'next';

const directus = new Directus('https://islamapps.wansal.co');

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  const hadiths = await directus.items('hadith').readMany({
    meta: 'total_count',
    fields: [
      'id',
      'title',
      'content',
      'content_ar',
      'narrators.hadith_narrator_id.name',
      'topics.hadith_topic_id.name',
      'sahih',
    ],
  });

  res
    .status(200)
    .json({ hadiths: hadiths.data, total: hadiths.meta?.total_count });
}
