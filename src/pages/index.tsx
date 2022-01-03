import { GetStaticProps, InferGetStaticPropsType } from 'next';

import {
  getAllHadiths,
  getAllNarrators,
  getAllTopics,
  Hadith,
  Narrator,
  Topic,
} from '@/lib/hadiths';

import Hadiths from '@/components/home/Hadiths';
import MuhammadSeal from '@/components/MuhammadSeal';

import Nav from '../components/Nav';
import Seo from '../components/Seo';

export const getStaticProps: GetStaticProps = async () => {
  const hadiths: Hadith[] = getAllHadiths();
  const narrators: Narrator[] = getAllNarrators();
  const topics: Topic[] = getAllTopics();

  return {
    props: {
      hadiths,
      narrators,
      topics,
    },
  };
};

export default function Home({
  hadiths,
  narrators,
  topics,
}): InferGetStaticPropsType<typeof getStaticProps> {
  return (
    <>
      <Seo />

      <Nav />

      <div className="layout py-28">
        <MuhammadSeal className="invert dark:invert-0 mx-auto mb-10 w-60 rounded-full border-8" />

        <div className="flex flex-col min-h-screen">
          <h1 className="lg:text-7xl mb-4 text-5xl font-light tracking-tighter leading-none text-center">
            <span className="font-bold">Hadith Ringkas</span>
          </h1>

          <p className="text-2xl font-normal text-center text-gray-500">
            Hadith-hadith yang mudah dihafal dari Nabi Muhammad{' '}
            <span className="text-[1.25em]">ﷺ</span>
          </p>

          <div className="mt-10">
            <Hadiths hadiths={hadiths} narrators={narrators} topics={topics} />
          </div>
        </div>
      </div>
    </>
  );
}
