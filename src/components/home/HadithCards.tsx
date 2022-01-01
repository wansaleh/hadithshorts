import clsx from 'clsx';
import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';

import { Hadith, Narrator, Topic } from '@/lib/hadiths';

import HadithCard from './HadithCard';

const options = {
  includeScore: true,
  keys: ['title', 'content'],
  threshold: 0.3,
};

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
  narrators,
  topics,
}: {
  hadiths: Hadith[];
  narrators: Narrator[];
  topics: Topic[];
}) {
  const [currentNarrator, setCurrentNarrator] = useState<string>('All');
  const [currentTopic, setCurrentTopic] = useState<string>('All');
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    if (currentNarrator !== 'All' || currentTopic !== 'All') {
      setSearchText('');
    }
  }, [currentNarrator, currentTopic]);

  useEffect(() => {
    if (searchText) {
      setCurrentNarrator('All');
      setCurrentTopic('All');
    }
  }, [searchText]);

  let filtered = hadiths.filter(
    (hadith) =>
      (currentNarrator === 'All'
        ? true
        : hadith.narrators.includes(currentNarrator)) &&
      (currentTopic === 'All' ? true : hadith.topics.includes(currentTopic))
  );

  if (searchText) {
    const fuse = new Fuse(filtered, options);
    filtered = fuse.search(searchText).map((res) => res.item);
  }

  return (
    <>
      <div className="flex flex-wrap gap-1 justify-center mb-10">
        <input
          type="search"
          className="bg-gray-500/20 focus:ring-2 dark:ring-offset-black py-4 px-6 w-full max-w-xl text-xl rounded-full ring-blue-500 ring-offset-2 transition duration-200 outline-none"
          placeholder="Cari hadith..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-1 justify-center mb-10">
        <Btn
          isSelected={'All' === currentNarrator}
          onClick={() => setCurrentNarrator('All')}
        >
          Semua
        </Btn>
        {narrators.map(({ name }) => (
          <Btn
            key={name}
            isSelected={name === currentNarrator}
            onClick={() => setCurrentNarrator(name)}
          >
            {name}
          </Btn>
        ))}
      </div>

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
        {filtered.map((hadith) => (
          <HadithCard key={hadith.slug} hadith={hadith} />
        ))}
      </div>
    </>
  );
}
