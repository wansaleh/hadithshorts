// import Link from 'next/link';
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import { Fragment } from 'react';

const themes = [
  {
    value: 'light',
    label: 'Light',
    icon: SunIcon,
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: MoonIcon,
  },
  {
    value: 'system',
    label: 'System',
    icon: SystemIcon,
  },
];
export default function Nav() {
  const { theme, setTheme } = useTheme();

  return (
    <ul className="flex absolute top-0 right-0 left-0 justify-between p-4 text-sm">
      <li>
        {/* <Link href="/">
          <a>Home</a>
        </Link> */}
      </li>

      <li>
        <ul className="flex">
          <li className="relative">
            <Listbox value={theme} onChange={setTheme}>
              <Listbox.Label className="sr-only">Theme</Listbox.Label>
              <Listbox.Button type="button">
                <span className="dark:hidden">
                  <SunIcon className="w-6 h-6" />
                </span>
                <span className="dark:inline hidden">
                  <MoonIcon className="w-6 h-6" />
                </span>
              </Listbox.Button>
              <Listbox.Options
                className={clsx(
                  'absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-gray-500/20 shadow-lg overflow-hidden w-36 py-1 text-sm text-gray-700 font-semibold dark:bg-black dark:highlight-white/5 dark:text-gray-300'
                )}
              >
                {themes.map(({ value, label, icon: Icon }) => (
                  <Listbox.Option key={value} value={value} as={Fragment}>
                    {({ active, selected }) => (
                      <li
                        className={clsx(
                          'py-1 px-2 flex items-center cursor-pointer',
                          selected && 'text-sky-500',
                          active && 'bg-gray-500/10'
                        )}
                      >
                        <Icon className="mr-2 w-5 h-5" />
                        {label}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </li>
        </ul>
      </li>
    </ul>
  );
}

function SunIcon(props) {
  return (
    <svg
      height="48"
      width="48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" x2="12" y1="1" y2="3" />
      <line x1="12" x2="12" y1="21" y2="23" />
      <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
      <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
      <line x1="1" x2="3" y1="12" y2="12" />
      <line x1="21" x2="23" y1="12" y2="12" />
      <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
      <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
    </svg>
  );
}
function MoonIcon(props) {
  return (
    <svg
      height="48"
      width="48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function SystemIcon(props) {
  return (
    <svg
      height="48"
      width="48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect height="14" width="20" rx="2" ry="2" x="2" y="3" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}
