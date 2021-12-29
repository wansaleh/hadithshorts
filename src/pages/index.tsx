import { shuffle } from 'lodash-es';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { getAllHadiths, Hadith } from '@/lib/hadiths';

import HadithCards from '@/components/home/HadithCards';

import Nav from '../components/Nav';
import Seo from '../components/Seo';

export const getServerSideProps: GetStaticProps = async () => {
  const hadiths: Hadith[] = shuffle(getAllHadiths());

  return {
    props: {
      hadiths,
    },
  };
};

export default function Home({
  hadiths,
}): InferGetStaticPropsType<typeof getStaticProps> {
  return (
    <>
      <Seo templateTitle="Home" />

      <Nav />

      <div className="layout py-28">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="mb-4 text-7xl font-light tracking-tighter leading-none">
            Welcome to <span className="font-bold">Hadith Shorts.</span>
          </h1>

          <p className="text-xl font-normal text-gray-500">
            Memorisable Hadiths from Prophet Muhammad SAW.
          </p>

          <div className="mt-20">
            <HadithCards hadiths={hadiths} />
          </div>
        </div>
      </div>
    </>
  );
}
