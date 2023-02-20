import { IReview } from '@/types/IRocketReview'
import React from 'react'
import Review from './Review'

const ReviewList: React.FC<{ reviews: IReview[] }> = ({ reviews }) => {
    return (
        <>
                {reviews.map((review, index) => {
                    return <Review key={review.id} review={review} />
                })}
        </>
    )
}

export default ReviewList