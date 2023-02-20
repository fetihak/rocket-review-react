import { IReview, IRocket } from '@/types/IRocketReview';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select, { createFilter } from 'react-select';
import SearchForm from './SearchForm';
import { useRouter } from 'next/router'
import { User } from '@/types/IUser';
import { ColorRing } from 'react-loader-spinner'
import { getRockets, getReviewById } from '@/utils/api';

type ReviewFormProps = {
    submitData: (rocket: any, user: User, review: any) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ submitData }) => {

    const { register, handleSubmit, setValue } = useForm<IReview>();

    const [review, setReview] = useState<IReview>();

    const [rockets, setRockets] = useState();

    const [loading, setLoading] = useState<boolean>(false);

    const [selectedUser, setSelectedUser] = useState<User>();

    // const []

    const [selectedRocket, setSelectedRocket] = useState({
        label: '',
        value: '',
        image: ''
    });

    const router = useRouter();

    const { id } = router.query;

    const setUserHandler = (data: any) => {
        setSelectedUser(data)
    }
    const handleChange = (event: any) => {
        setSelectedRocket({
            value: event.value,
            image: event.image,
            label: event.label,
        });
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
        submitData(selectedRocket, selectedUser as User, detail)
    }

    return (
        <>
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
            {!loading && <form onSubmit={handleSubmit(onSubmit)}>
                <div className='container mx-auto py-4'>
                    <div className="w-5/6 lg:w-3/4 mx-auto bg-white rounded shadow">
                        <div className="py-4 px-8 text-black text-xl border-b border-grey-lighter">
                            Write Your Review About Rocket
                        </div>
                        <div className="py-4 px-8">
                            <div className='mt-4'>
                                <label htmlFor='rocketName' className="block text-grey-darker text-sm font-bold mb-2"> Rocket Name</label>
                                <Select
                                    options={rockets}
                                    onChange={handleChange}
                                    value={selectedRocket}
                                    filterOption={createFilter({ matchFrom: "start" })}
                                    name="defect-code"
                                    className="w-full"
                                    inputId="defect-code"

                                />
                            </div>
                            <div className='mt-4'>
                                <label htmlFor='reviewTitle' className="block text-grey-darker text-sm font-bold mb-2"> Review Title</label>
                                <input id="reviewTitle"
                                    className="appearance-none border 
                                     rounded w-full py-2 px-3 text-grey-darker"
                                    {...register("reviewTitle", { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <label htmlFor='description' className="block text-grey-darker text-sm font-bold mb-2"> Review </label>
                                <textarea id="description"
                                 className="appearance-none border 
                                 rounded w-full py-2 px-3 
                                 text-grey-darker" {...register("description", { required: true })} />
                            </div>
                            <div className='mt-4'>
                                <SearchForm user={selectedUser as User} setSelectedUser={setUserHandler} />
                            </div>
                            <div className='mt-4 mt-4'>
                                <button
                                    type='submit'
                                    className="bg-blue-500 hover:bg-blue-700 
                                     text-white rounded-md py-3 px-6 font-bold hover:scale-110 duration-300 "
                                >
                                    Save
                                </button>
                                <button
                                    type='button'
                                    className="bg-red-500 hover:bg-red-700 text-white rounded-md py-3 px-6 font-bold hover:scale-110 duration-300 "
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