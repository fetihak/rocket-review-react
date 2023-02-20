import { IReview, IRocket } from '@/types/IRocketReview';
import axios from 'axios';
import { apiClient } from "../utils/axios";


const BASE_URL = 'https://us-central1-sora-union-rockets.cloudfunctions.net/webApp/api';



const getReviews = async (): Promise<IReview[]> => {
    const response = await apiClient.get<IReview[]>(`${BASE_URL}/review`);
    return response.data;
};
const getReviewById = async (id: string): Promise<any> => {
    const response = await apiClient.get(`${BASE_URL}/review/getById?id=${id}`);
    return response.data;
};

const createReview = async (review: IReview): Promise<IReview> => {
    const response = await apiClient.post(`${BASE_URL}/review/create`, review);
    return response.data;
};


const updateReview = async (review: IReview): Promise<IReview> => {
    const response = await apiClient.post(`${BASE_URL}/review/update`, {data:{...review},id: review.id});
    return response.data;
};

const deleteReview = async (id: string): Promise<any> => {
    const response = await apiClient.post(`${BASE_URL}/review/delete?id=${id}`);
    return response.data;
};
const searchUser = async (query:string) : Promise<any>=> {
      const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
      return response.data;
    //     id: item.id,
    //     login: item.login,
    //     avatar_url: item.avatar_url,
    //   }));
};
const getRockets = async (): Promise<any[]> => {
    const response = await apiClient.get<any[]>(`${BASE_URL}/rocket`);
    return response.data;
};

export { getReviews, getReviewById, createReview, updateReview, deleteReview ,getRockets , searchUser};