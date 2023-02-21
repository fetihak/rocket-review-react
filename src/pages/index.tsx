import { IReview } from '../types/IRocketReview'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReviewList from '@/components/ReviewList';
import { useState } from 'react';
import { getReviews } from '@/utils/api';

const Home: React.FC<{ reviews: IReview[] }> = ({ reviews }) => {


  return (
    <>
      <Header showAddButton={true} />
      <main className="flex-grow">
        <ReviewList reviews={reviews} />
        {reviews.length == 0 &&
          <div className="pt-6 pb-12 h-96 bg-gray-100">
            <div id="card" className="">
              <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
               <h1 className='font-extrabold text-4xl text-center mt-10'>No Review To Display</h1> 
              </div>
            </div>
          </div>
        }
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
    revalidate: 1,
  };
}

export default Home;