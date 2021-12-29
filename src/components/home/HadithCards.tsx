import { Hadith } from '@/lib/hadiths';

import HadithCard from './HadithCard';

export default function HadithCards({ hadiths }: { hadiths: Hadith[] }) {
  return (
    <div className="md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-8">
      {hadiths.map((hadith) => (
        <HadithCard key={hadith.slug} hadith={hadith} />
      ))}
    </div>
  );
}
