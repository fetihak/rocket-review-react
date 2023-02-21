import { createReview, updateReview , deleteReview } from '@/utils/api';
import useToaster from '@/hooks/useToaster';
import { useRouter } from 'next/router';
export const usePostData = () => {
  const router = useRouter();
  const postData = (data) => {
    createReview(data).then(response => {
      if (response) {
        useToaster({ message: "Successfully Created Review" })
        router.push('/', undefined, { shallow: true });
      }
    }).catch(error => {
      useToaster({ message: "Something Went Wrong, Please Try Again Later" })
    });
  }
  const updateData = (data) => {
    updateReview(data).then(response => {
      if (response) {
        useToaster({ message: "Successfully Updated Review" })
        router.push('/', undefined, { shallow: true });
      }
    }).catch(error => {
      useToaster({ message: "Something Went Wrong, Please Try Again Later" })
    });
  }
  const deleteData = (id) => {
    deleteReview(id).then(response => {
      if (response) {
        useToaster({ message: "Successfully Deleted Review" })
        router.push('/');
      }
    }).catch(error => {
      useToaster({ message: "Something went wrong, please try again later" })
    });
  }
  return { postData, updateData, deleteData };
};
export default usePostData;