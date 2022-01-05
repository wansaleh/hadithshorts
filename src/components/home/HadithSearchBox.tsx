import { useRef, useState } from 'react';
import { useKey } from 'react-use';

export default function HadithSearchBox({ searchText, setSearchText }) {
  const [focused, setFocused] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement>(null);

  useKey('/', () => {
    setTimeout(() => {
      ref.current?.focus();
    }, 10);
  });

  return (
    <div className="relative mx-auto mb-10 max-w-xl">
      <input
        ref={ref}
        type="search"
        className="focus:ring-2 dark:ring-offset-black dark:bg-neutral-900 bg-neutral-200 py-2 px-6 w-full text-xl rounded-full ring-blue-500 ring-offset-2 transition duration-200 outline-none"
        placeholder="Cari hadith..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {!focused && (
        <div className="border-neutral-500/50 text-neutral-500/90 absolute top-1/2 right-4 px-1.5 rounded border text-sm transform -translate-y-1/2">
          /
        </div>
      )}
    </div>
  );
}
