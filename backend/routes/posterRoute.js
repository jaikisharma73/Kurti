import express from 'express';
import { addPoster, listPosters, removePoster, togglePosterStatus } from '../controllers/posterController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const posterRouter = express.Router();

posterRouter.post('/add', adminAuth, upload.single('image'), addPoster);
posterRouter.post('/remove', adminAuth, removePoster);
posterRouter.post('/toggle-status', adminAuth, togglePosterStatus);
posterRouter.get('/list', listPosters);

export default posterRouter;
