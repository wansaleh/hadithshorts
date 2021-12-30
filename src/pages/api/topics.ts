// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

import { getAllTopics } from '@/lib/hadiths';

export default function hello(req: NextApiRequest, res: NextApiResponse) {
  const topics = getAllTopics();

  res.status(200).json({ topics, total: topics.length });
}
