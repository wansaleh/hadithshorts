import clsx from 'clsx';
import { useState } from 'react';

import { Hadith, Topic } from '@/lib/hadiths';

import HadithCard from './HadithCard';

interface BtnProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSelected?: boolean;
  className?: string;
  color?: 'red' | 'blue';
}

function Btn({ isSelected, className, children, ...props }: BtnProps) {
  return (
    <button
      type="button"
      className={clsx(
        'hover:bg-gray-500/30 py-1.5 px-3 transition duration-200 leading-none rounded-full',
        isSelected && 'bg-gray-500/30',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

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
        <Btn
          isSelected={'All' === currentTopic}
          onClick={() => setCurrentTopic('All')}
        >
          Semua
        </Btn>
        {topics.map(({ topic }) => (
          <Btn
            key={topic}
            isSelected={topic === currentTopic}
            onClick={() => setCurrentTopic(topic)}
          >
            {topic}
          </Btn>
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
