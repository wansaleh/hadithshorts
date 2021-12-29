import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

import { Hadith } from '@/lib/hadiths';

export default function HadithCard({ hadith }: { hadith: Hadith }) {
  const wordCount = hadith.content.split(' ').length;

  return (
    <div
      key={hadith.slug}
      className="aspect-[25/35] p-8 rounded-3xl border-4 border-current flex flex-col"
    >
      <h2 className="mb-4 text-3xl font-bold">{hadith.title}</h2>

      <ReactMarkdown
        className={clsx(
          'prose prose-lg dark:prose-invert leading-normal',
          wordCount < 30 && 'text-xl',
          wordCount > 50 && 'text-sm'
        )}
      >
        {hadith.content}
      </ReactMarkdown>

      <div className="flex-1" />

      <div className="mt-4 text-right">
        <svg
          viewBox="0 0 24 24"
          className="h-[1em] fill-current inline-block mr-1 -mt-1"
        >
          <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM12,6a6,6,0,1,0,6,6A6,6,0,0,0,12,6Zm0,10a4,4,0,1,1,4-4A4,4,0,0,1,12,16Z" />
        </svg>
        <span className="text-gray-500">from</span>{' '}
        <span>{hadith.narrator}</span>
      </div>
    </div>
  );
}
