import arrayToSentence from 'array-to-sentence';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkSmartypants from 'remark-smartypants';

import { Hadith } from '@/lib/hadiths';

export default function HadithCard({
  hadith,
  setCurrentTopic,
}: {
  hadith: Hadith;
  setCurrentTopic: (topic: string) => void;
}) {
  const wordCount = hadith.content.split(' ').length;

  return (
    <div className="relative p-8 rounded-3xl border-4 border-current">
      <div className="flex relative z-10 flex-col h-full">
        {hadith.topics && (
          <div className="flex gap-2 mb-4">
            {hadith.topics.map((topic) => (
              <button
                key={topic}
                type="button"
                className="dark:bg-white dark:text-black inline-block py-1 px-2 text-sm font-bold leading-none text-white bg-black rounded-full"
                onClick={() => setCurrentTopic(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        )}

        <h2 className="mb-6 text-3xl font-bold">{hadith.title}</h2>

        <div
          data-word-count={wordCount}
          className={clsx(
            'prose prose-lg dark:prose-invert leading-normal font-light',
            wordCount < 10 && 'text-3xl',
            wordCount >= 10 && wordCount < 20 && 'text-2xl',
            wordCount >= 20 && wordCount < 30 && 'text-xl',
            wordCount >= 30 && wordCount < 50 && 'text-base',
            wordCount >= 50 && wordCount < 70 && 'text-base',
            wordCount >= 70 && 'text-sm'
          )}
        >
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkSmartypants]}
            data-wordCount={wordCount}
          >
            {hadith.content}
          </ReactMarkdown>
        </div>

        <div className="flex-1" />

        <div className="flex justify-between items-end mt-16 text-sm">
          <span className="font-light">
            <span>Riwayat</span>{' '}
            <span className="font-bold">
              {arrayToSentence(hadith.narrators, { lastSeparator: ' dan ' })}
            </span>
          </span>

          {/* <span
            className={clsx(
              'uppercase text-sm font-bold',
              hadith.status === 'Sahih' && 'text-green-500'
            )}
          >
            {hadith.status}
          </span> */}
        </div>
      </div>
    </div>
  );
}
