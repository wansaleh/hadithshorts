import { NextApiRequest, NextApiResponse } from 'next';

import { getQuranPage } from '@/lib/quran';

export default function quran(req: NextApiRequest, res: NextApiResponse) {
  const page = Number(req.query.page) || 1;
  const lines = getQuranPage(page);

  res.status(200).json({ page, lines });
}
