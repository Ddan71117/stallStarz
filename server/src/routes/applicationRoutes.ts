import express from 'express';
import {reviewRouter, reviewsRouter} from './reviewRoutes';


const router = express.Router();

router.use('/', require('./authRoutes'));
router.use('/review', reviewRouter)
router.use('/reviews', reviewsRouter);


export default router;
