import { Request, Response } from 'express';
import Review from '../models/Review';
import {requestUser} from './utils/requestUser';

const reviewListing = (review: Review) => ({
    id: review.id,
    restroomId: review.restroomId,
    createdAt: review.createdAt,
    title: review.title,
    content: review.content,
});

export const getReviews = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { restroomId } = req.body;

        const reviews = await Review.findAll({
            where: { restroomId: restroomId }
        });

        if (!reviews) {
            return res.status(204);
        }

        return res.status(200).json(reviews.map(reviewListing));
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching reviews' });
    }
};

export const addReview = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { restroomId, title, content } = req.body;

        const user = await requestUser(req);
        if (!user) {
            return res.status(500).json({ message: 'Error adding review' });
        }

        const review = await Review.create({
            userId: user.id,
            restroomId: restroomId,
            createdAt: new Date(),
            title: title,
            content: content
        });

        return res.status(201).json(reviewListing(review))
    } catch (error) {
        return res.status(500).json({ message: 'Error adding review' });
    }
};

