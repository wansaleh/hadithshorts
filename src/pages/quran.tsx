import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { getQuranPage } from '@/lib/quran';

import Seo from '@/components/Seo';

export const getStaticProps: GetStaticProps = async () => {
  const lines: string[] = getQuranPage(2);

  return {
    props: {
      lines,
    },
  };
};

export default function Home({
  lines,
}): InferGetStaticPropsType<typeof getStaticProps> {
  return (
    <>
      <Seo templateTitle="Quran View" />
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
        @font-face {
          font-family: 'Mushaf Page 002';
          src: local('QCF_P002'),
               url(https://cdn.rawgit.com/mustafa0x/qpc-fonts/f93bf5f3/mushaf-woff2/QCF_P002.woff2) format('woff2'),
               url(https://cdn.rawgit.com/mustafa0x/qpc-fonts/f93bf5f3/mushaf-woff/QCF_P002.woff) format('woff');
        }
        `,
          }}
        />
      </Head>

      <div className="layout py-28">
        {lines.map((line, i) => (
          <div key={i} className="quran text-5xl leading-relaxed">
            {line}
          </div>
        ))}
      </div>

      <style jsx>{`
        .quran {
          font-family: 'Mushaf Page 002';
        }
      `}</style>
    </>
  );
}
