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
      <div className="flex flex-wrap gap-1 justify-center mb-20">
        <button
          type="button"
          className={clsx(
            'hover:bg-gray-500 hover:bg-opacity-20 py-1.5 px-3 transition duration-200 leading-none rounded-full',
            'All' === currentTopic && 'bg-gray-500 bg-opacity-20'
          )}
          onClick={() => setCurrentTopic('All')}
        >
          Semua
        </button>
        {topics.map(({ topic }) => (
          <button
            key={topic}
            type="button"
            className={clsx(
              'hover:bg-gray-500 hover:bg-opacity-20 py-1.5 px-3 transition duration-200 leading-none rounded-full',
              topic === currentTopic && 'bg-gray-500 bg-opacity-20'
            )}
            onClick={() => setCurrentTopic(topic)}
          >
            {topic}
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
