import { IReview, IRocket } from '@/types/IRocketReview';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import SearchForm from './SearchForm';
import { useRouter } from 'next/router'
import { User } from '@/types/IUser';
import ColorRingConfig from '@/components/ColorRingConfig';
import { getRockets, getReviewById } from '@/utils/api';

type ReviewFormProps = {
    submitData: (rocket: any, user: User, review: any) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ submitData }) => {

    const { register, handleSubmit, setValue, formState: { errors , isValid  } } = useForm<IReview>();

    const [review, setReview] = useState<IReview>();

    const [rockets, setRockets] = useState();

    const [loading, setLoading] = useState<boolean>(false);

    const [selectedUser, setSelectedUser] = useState<User>();

    const [ userError, setUserError]= useState(false);

    const [ rocketError, setRocketError]= useState(false);


    const [selectedRocket, setSelectedRocket] = useState({
        label: '',
        value: '',
        image: ''
    });

    const router = useRouter();

    const { id } = router.query;

    const setUserHandler = (data: any) => {
        setUserError(false)
        setSelectedUser(data)
    }
    const handleChange = (event: any) => {

        setSelectedRocket({
            value: event.value,
            image: event.image,
            label: event.label,
        });
        setRocketError(false)
    }

    useEffect(() => {
        setLoading(true);
        getRockets().then(resp => {
            setLoading(false)
            const rocketList = resp?.map((rc: any) => ({
                value: rc.id,
                label: rc.name,
                image: rc.image,
            }));
            setRockets(rocketList as any);
        });
    }, [])
    useEffect(() => {
        const fetchReview = async () => {
            getReviewById(id as string).then(resp => {
                setReview(resp.data)
            });

        };
        if (router.isReady) {
            fetchReview();
        }
    }, [router.isReady, id]);

    useEffect(() => {
        if (review) {
            const { reviewTitle, description, rocketName,
                rocketImage, userId, username, userAvatar

            } = review;
            setValue("reviewTitle", reviewTitle);
            setValue("description", description);
            setSelectedRocket({
                label: rocketName,
                image: rocketImage,
                value: rocketName,
            });
            setSelectedUser({
                id: userId,
                login: username,
                avatar_url: userAvatar,
            })
        }
    }, [review, setValue]);

    const onSubmit = (data: any) => {
        const detail = { ...data, id: id, }
        if(selectedRocket.label===''){
            setRocketError(true)
            return;
        }
        if(!selectedUser || !selectedUser.id){
            setUserError(true)
            return
        }
        submitData(selectedRocket, selectedUser as User, detail)
    }

    return (
        <>
            {loading &&
                <div className="flex h-full items-center justify-center">
                    <ColorRingConfig />
                </div>
            }
            {!loading && <form onSubmit={handleSubmit(onSubmit)}>
                <div className='container mx-auto py-4'>
                    <div className="w-5/6 lg:w-3/4 mx-auto bg-white rounded shadow">
                        <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
                            Write Your Review About Rocket 
                            {/* <span className='text-sm'><span className='red '>(*)</span> Required Field </span> */}
                        </div>
                        <div className="py-4 px-8">
                            <div className='mt-4'>
                                <label htmlFor='rocketName' className="block text-grey-darker text-sm font-bold mb-2"> Rocket Name
                                <span className='red'>   *</span>
                                </label>
                                <Select
                                    options={rockets}
                                    onChange={handleChange}
                                    value={selectedRocket}
                                    required={true}
                                    filterOption={createFilter({ matchFrom: "start" })}
                                    name="defect-code"
                                    className="w-full"
                                    inputId="defect-code"

                                />
                                { rocketError && <span className='red'>This is required</span>}
                            </div>
                            <div className='mt-4'>
                                <label htmlFor='reviewTitle' className="block text-grey-darker text-sm font-bold mb-2"> Review Title
                                <span className='red'> *</span>
                                </label>
                                <input id="reviewTitle"
                                    className="appearance-none border 
                                     rounded w-full py-2 px-3 text-grey-darker"
                                    {...register("reviewTitle", { required: true, maxLength: 50 })} />
                                {errors.reviewTitle && errors.reviewTitle.type === "required" && <span className='red'>This is required</span>}
                                {errors.reviewTitle && errors.reviewTitle.type === "maxLength" && <span className='red'>Max length exceeded (Max Charachter :50)</span>}
                            </div>
                            <div className='mt-4'>
                                <label htmlFor='description' className="block text-grey-darker text-sm font-bold mb-2"> Review 
                                <span className='red'>   *</span>
                                </label>
                                <textarea id="description"
                                    className="appearance-none border 
                                 rounded w-full py-2 px-3 
                                 text-grey-darker" {...register("description", { required: true, maxLength: 500 })} />
                                {errors.description && errors.description.type === "required" && <span className='red'>This is required</span>}
                                {errors.description && errors.description.type === "maxLength" && <span className='red'>Max length exceeded (Max Charachter :500)</span>}
                            </div>
                            <div className='mt-4'>
                                <SearchForm user={selectedUser as User}
                                 setSelectedUser={setUserHandler} 
                                 />
                                { userError  && <span className='red'>This is required</span>}
                               
                           
                            </div>
                            <hr className='mt-10 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
                            <div className='mt-4 mt-4'>
                                <button
                                    type='submit'
                                   
                                    className="bg-blue-700 active:bg-blue-700 
                                    text-white font-bold py-2 px-6 rounded
                                    mx-2.5  disabled:bg-blue-400"
                                >
                                    Save
                                </button>
                                <button
                                    type='button'
                                    className="bg-red-500 
                                    bg-red-500 hover:bg-red-700 
                                    text-white font-bold py-2 px-6 rounded "
                                    onClick={() => router.push('/')}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            }
        </>
    )
}

export default ReviewForm