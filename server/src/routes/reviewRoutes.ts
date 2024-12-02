import express from 'express';
import {addReview, getReviews} from '../controllers/reviewController';

// Router to handle single modifications
export const reviewRouter = express.Router();
reviewRouter.post('/', addReview);

// Router to handle multiple modifications
export const reviewsRouter = express.Router();
reviewsRouter.get('/', getReviews);


