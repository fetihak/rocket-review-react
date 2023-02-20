import React, { useState } from 'react'
import ReviewForm from '@/components/ReviewForm'
import { createReview, updateReview } from '@/utils/api';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { User } from '@/types/IUser';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from 'react-loader-spinner'

const reviewForm: React.FC = () => {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = (rocket: any, user: User, review: any) => {
    const data = {
      ...review,
      rocketName: rocket.label,
      rocketImage: rocket.image,
      username: user.login,
      userId: user.id,
      userAvatar: user.avatar_url
    }
    if (review.id == 0) { // ADD
      setLoading(true);
      delete data.id;
      createReview(data).then(response => {
        if (response) {
          toast("Review Added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          router.push('/', undefined, { shallow: true });
        }
      }).catch(error => {
        toast("Something Went Wrong, Please Try Again Later")
      });
    }
    else {
      updateReview(data).then(response => {
        if (response) {
          toast("Review Updated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          router.push('/', undefined, { shallow: true });
        }
      }).catch(error => {
        toast("Something Went Wrong, Please Try Again Later")
      });
    }
    // router.push('/reviews');
  };

  return (
    <>
      <Header showAddButton={false} />
      <div>
        <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
        {!loading &&
          <div className='pt-6 pb-12 bg-gray-100'>
            <ReviewForm submitData={handleSubmit} />
          </div>}
        {loading &&
          <div className="flex h-full items-center justify-center">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        }
      </div>
      <Footer />
    </>
  )
}

export default reviewForm