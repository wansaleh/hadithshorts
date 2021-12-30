import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkSmartypants from 'remark-smartypants';

import { Hadith } from '@/lib/hadiths';

export default function HadithCard({ hadith }: { hadith: Hadith }) {
  const wordCount = hadith.content.split(' ').length;

  return (
    <div
      key={hadith.slug}
      className="aspect-[25/40] p-8 rounded-3xl border-4 border-current relative"
    >
      {/* <div className="-z-0 absolute bottom-2 right-4 text-8xl font-bold tracking-tighter leading-none opacity-5">
        {hadith.number}
      </div> */}

      <div className="flex relative z-10 flex-col h-full">
        {hadith.topics && (
          <div className="flex gap-2 mb-4">
            {hadith.topics.map((topic) => (
              <span
                key={topic}
                className="dark:bg-white dark:text-black inline-block py-1 px-2 text-sm font-bold leading-none text-white bg-black rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          {hadith.title}
        </h2>

        <ReactMarkdown
          remarkPlugins={[remarkSmartypants]}
          className={clsx(
            'prose prose-lg dark:prose-invert leading-normal font-light',
            wordCount < 20 && 'text-2xl',
            wordCount >= 20 && wordCount < 30 && 'text-xl',
            wordCount > 70 && 'text-sm'
          )}
        >
          {hadith.content}
        </ReactMarkdown>

        <div className="flex-1" />

        <div className="mt-4 font-light">
          <span>Riwayat</span>{' '}
          <span className="font-bold">{hadith.narrator}</span>
        </div>
      </div>
    </div>
  );
}
