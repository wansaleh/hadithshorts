import clsx from 'clsx';
import { useState } from 'react';

import { Hadith, Topic } from '@/lib/hadiths';

import HadithCard from './HadithCard';

export default function HadithCards({
  hadiths,
  topics,
}: {
  hadiths: Hadith[];
  topics: Topic[];
}) {
  const [currentTopic, setCurrentTopic] = useState<string>('All');

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center mb-20">
        <button
          type="button"
          className={clsx(
            'hover:border-current border-b-2 border-transparent transition duration-200',
            'All' === currentTopic && '!border-current'
          )}
          onClick={() => setCurrentTopic('All')}
        >
          Semua ({hadiths.length})
        </button>
        {topics.map(({ topic, count }) => (
          <button
            key={topic}
            type="button"
            className={clsx(
              'hover:border-current border-b-2 border-transparent transition duration-200',
              topic === currentTopic && '!border-current'
            )}
            onClick={() => setCurrentTopic(topic)}
          >
            {topic} ({count})
          </button>
        ))}
      </div>

      <div className="md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-8">
        {hadiths
          .filter((hadith) =>
            currentTopic === 'All' ? true : hadith.topics.includes(currentTopic)
          )
          .map((hadith) => (
            <HadithCard key={hadith.slug} hadith={hadith} />
          ))}
      </div>
    </>
  );
}
