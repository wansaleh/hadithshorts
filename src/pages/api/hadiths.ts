// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

import { getAllHadiths } from '@/lib/hadiths';

export default function hello(req: NextApiRequest, res: NextApiResponse) {
  const hadiths = getAllHadiths();

  res.status(200).json({ hadiths, total: hadiths.length });
}
