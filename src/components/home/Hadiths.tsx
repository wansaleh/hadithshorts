import Fuse from 'fuse.js';
import { useEffect, useState } from 'react';

import type { Hadith, Narrator, Topic } from '@/lib/hadiths';

import HadithCard from './HadithCard';
import HadithFilters from './HadithFilters';
import HadithSearchBox from './HadithSearchBox';

const options = {
  includeScore: true,
  keys: ['title', 'content'],
  threshold: 0.35,
};

export default function Hadiths({
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
    const result = fuse.search(searchText);
    filtered = result.map((res) => res.item);
  }

  return (
    <>
      <HadithSearchBox searchText={searchText} setSearchText={setSearchText} />

      <HadithFilters
        narrators={narrators}
        topics={topics}
        currentNarrator={currentNarrator}
        setCurrentNarrator={setCurrentNarrator}
        currentTopic={currentTopic}
        setCurrentTopic={setCurrentTopic}
      />

      <div className="md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-8">
        {filtered.map((hadith) => (
          <HadithCard
            key={hadith.slug}
            hadith={hadith}
            setCurrentTopic={setCurrentTopic}
          />
        ))}
      </div>
    </>
  );
}
