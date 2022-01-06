export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full text-sm">
      <div className="flex gap-4 justify-center px-4 pb-4 font-semibold tracking-tight text-center text-gray-500">
        <a
          href="https://hijri.wansaleh.com"
          rel="external"
          className="hover:border-0 border-b-2 border-current"
        >
          Hijri Holidays
        </a>
        <a
          href="https://solat.wansaleh.com"
          rel="external"
          className="hover:border-0 border-b-2 border-current"
        >
          Waktu Solat
        </a>
        <a
          href="https://panduantarawih.com"
          rel="external"
          className="hover:border-0 border-b-2 border-current"
        >
          Panduan Tarawih
        </a>

        <span>© {new Date().getFullYear()} By Wan Saleh</span>
      </div>
    </footer>
  );
}
