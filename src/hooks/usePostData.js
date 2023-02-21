import { createReview, updateReview , deleteReview } from '@/utils/api';
import setToaster from '@/components/setToaster';
import { useRouter } from 'next/router';
export const usePostData = () => {
  const router = useRouter();
  const postData = (data) => {
    createReview(data).then(response => {
      if (response) {
        setToaster({ message: "Successfully Created Review" })
        router.push('/', undefined, { shallow: true });
      }
    }).catch(error => {
      setToaster({ message: "Something Went Wrong, Please Try Again Later" })
    });
  }
  const updateData = (data) => {
    updateReview(data).then(response => {
      if (response) {
        setToaster({ message: "Successfully Updated Review" })
        router.push('/', undefined, { shallow: true });
      }
    }).catch(error => {
      setToaster({ message: "Something Went Wrong, Please Try Again Later" })
    });
  }
  const deleteData = (id) => {
    deleteReview(id).then(response => {
      if (response) {
        setToaster({ message: "Successfully Deleted Review" })
        router.push('/');
      }
    }).catch(error => {
      setToaster({ message: "Something went wrong, please try again later" })
    });
  }
  return { postData, updateData, deleteData };
};
export default usePostData;