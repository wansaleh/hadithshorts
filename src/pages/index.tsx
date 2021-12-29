// import { shuffle } from 'lodash-es';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getAllHadiths, Hadith } from '@/lib/hadiths';

import HadithCards from '@/components/home/HadithCards';
import MuhammadSeal from '@/components/MuhammadSeal';

import Nav from '../components/Nav';
import Seo from '../components/Seo';

export const getServerSideProps: GetServerSideProps = async () => {
  const hadiths: Hadith[] = getAllHadiths();

  return {
    props: {
      hadiths,
    },
  };
};

export default function Home({
  hadiths,
}): InferGetServerSidePropsType<typeof getServerSideProps> {
  return (
    <>
      <Seo />

      <Nav />

      <div className="layout py-28">
        <MuhammadSeal className="dark:invert mx-auto mb-10 w-60" />

        <div className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="mb-4 text-7xl font-light tracking-tighter leading-none">
            <span className="font-bold">Hadith-hadith Ringkas</span>
          </h1>

          <p className="text-2xl font-normal text-gray-500">
            Hadith-hadith yang mudah dihafal dari Nabi Muhammad SAW.
          </p>

          <div className="mt-20">
            <HadithCards hadiths={hadiths} />
          </div>
        </div>
      </div>
    </>
  );
}
