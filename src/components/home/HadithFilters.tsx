import { orderBy } from 'lodash-es';

import type { Narrator, Topic } from '@/lib/hadiths';

import Btn from '../Btn';

export default function HadithFilters({
  narrators,
  topics,
  currentNarrator,
  setCurrentNarrator,
  currentTopic,
  setCurrentTopic,
}: {
  narrators: Narrator[];
  topics: Topic[];
  currentNarrator: string;
  setCurrentNarrator: (narrator: string) => void;
  currentTopic: string;
  setCurrentTopic: (topic: string) => void;
}) {
  return (
    <>
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
        {orderBy(topics, 'topic', 'asc').map(({ topic }) => (
          <Btn
            key={topic}
            isSelected={topic === currentTopic}
            onClick={() => setCurrentTopic(topic)}
          >
            {topic}
          </Btn>
        ))}
      </div>
    </>
  );
}
