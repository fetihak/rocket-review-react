import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { IReview } from '@/types/IRocketReview'
import ConfirmationModal from './ConfirmationModal';
import ToastContainerConfig from './ToastContainerConfig';
import usePostData from '@/hooks/usePostData';

const Review: React.FC<{ review: IReview }> = ({ review }) => {

  const router = useRouter();

  const { deleteData } = usePostData();

  const [showModal, setShowModal] = useState(false)

  const { id, reviewTitle, rocketImage, rocketName, username, description, userId, userAvatar } = review;

  const editHandler = () => {
    router.push(`review/${id}`)
  }

  const deleteHandler = () => {

    setShowModal(true)

  }
  const hideModal = () => {

    setShowModal(false)

  }
  const handleCancelDelete = () => {

  }
  const handleConfirmDelete = () => {
    deleteData(id)
  }
  return (

    <div className="pt-6 pb-12 bg-gray-100">
      <div id="card" className="">
        <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
          <div v-for="card in cards" className="flex flex-col md:flex-row overflow-hidden
                                        bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
            <div className="h-64 w-auto md:w-1/2">
              <img src={rocketImage} className="inset-0 h-full w-full object-cover object-center" />
            </div>
            <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
              <div className="">
                <h3 className="font-semibold text-lg leading-tight truncate capitalize"> {rocketName?.substring(0, 50)}</h3>
                <div className='flex flex-row-reverse'>
                  <button onClick={editHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 ml-2 edit-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                  <button onClick={deleteHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 float-right delete-icon">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>

              </div>
              <h4 className="text-gray-400 text-md leading-tight truncate capitalize">{reviewTitle?.substring(0, 50)}</h4>
              <p className="mt-2">
                {description?.substring(0, 500)}
              </p>
              <div className="flex items-center">
                <img src={userAvatar} className="w-10 h-10 rounded-full mr-4" alt="User Avatar" />
                <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
                  {username}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainerConfig />
      {showModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete the review ${reviewTitle}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          onClose={hideModal}
          header={`Delete Review`}
          showButtons={true}
        />
      )
      }
    </div>
  )
}

export default Review;