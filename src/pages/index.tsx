import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getAllHadiths, getAllTopics, Hadith, Topic } from '@/lib/hadiths';

import HadithCards from '@/components/home/HadithCards';
import MuhammadSeal from '@/components/MuhammadSeal';

import Nav from '../components/Nav';
import Seo from '../components/Seo';

export const getServerSideProps: GetServerSideProps = async () => {
  const hadiths: Hadith[] = getAllHadiths();
  const topics: Topic[] = getAllTopics();

  return {
    props: {
      hadiths,
      topics,
    },
  };
};

export default function Home({
  hadiths,
  topics,
}): InferGetServerSidePropsType<typeof getServerSideProps> {
  return (
    <>
      <Seo />

      <Nav />

      <div className="layout py-28">
        <MuhammadSeal className="dark:invert mx-auto mb-10 w-60" />

        <div className="flex flex-col min-h-screen">
          <h1 className="mb-4 text-7xl font-light tracking-tighter leading-none text-center">
            <span className="font-bold">Hadith Ringkas</span>
          </h1>

          <p className="text-2xl font-normal text-center text-gray-500">
            Hadith-hadith yang mudah dihafal dari Nabi Muhammad SAW.
          </p>

          <div className="mt-20">
            <HadithCards hadiths={hadiths} topics={topics} />
          </div>
        </div>
      </div>
    </>
  );
}
