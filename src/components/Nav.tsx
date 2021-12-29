// import Link from 'next/link';
import { useTheme } from 'next-themes';

const themes = ['dark', 'light', 'system'];
const themesMalay = ['gelap', 'cerah', 'sistem'];

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
          <li className="ml-3">
            <button
              type="button"
              className="text-lg font-bold"
              onClick={(e) => {
                e.preventDefault();
                setTheme(
                  themes[
                    (themes.findIndex((t) => t === theme) + 1) % themes.length
                  ]
                );
              }}
            >
              {themesMalay[themes.findIndex((t) => t === theme)]}
            </button>
          </li>
        </ul>
      </li>
    </ul>
  );
}
