import { IReview } from '../types/IRocketReview'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReviewList from '@/components/ReviewList';
import { useState } from 'react';
import { getReviews } from '@/utils/api';

const Home: React.FC<{ reviews: IReview[] }> = ({ reviews }) => {

  if (!reviews) {
    return <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>;
  }
  return (
    <>
      <Header showAddButton={true} />
      <main className="flex-grow">
          <ReviewList reviews={reviews} />
      </main>
      <Footer />
    </>
  )
}
export async function getStaticProps() {
  const reviews = await getReviews();
  return {
    props: {
      reviews,
    },
  };
}

export default Home;