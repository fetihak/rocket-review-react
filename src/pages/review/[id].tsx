import React, { useState } from 'react'
import ReviewForm from '@/components/ReviewForm'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { User } from '@/types/IUser';
import usePostData from "@/hooks/usePostData";
import ToastContainerConfig from '@/components/ToastContainerConfig';
import ColorRingConfig from '@/components/ColorRingConfig';

const ReviewFormPage: React.FC<{}> = ({ }) => {

  const [loading, setLoading] = useState(false);

  const { postData, updateData } = usePostData();

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
      postData(data);
    }
    else {
      updateData(data)
    }
  };

  return (
    <>
      <Header showAddButton={false} />
      <div>
        <ToastContainerConfig />
        {!loading &&
          <div className='pt-6 pb-12 bg-gray-100'>
            <ReviewForm submitData={handleSubmit} />
          </div>}
        {loading &&
          <div className="flex h-full items-center justify-center">
            <ColorRingConfig />
          </div>
        }
      </div>
      <Footer />
    </>
  )
}

export default ReviewFormPage