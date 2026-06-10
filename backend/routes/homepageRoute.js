import express from 'express';
import { getHomepageConfig, updateHomepageConfig } from '../controllers/homepageController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const homepageRouter = express.Router();

homepageRouter.get('/get', getHomepageConfig);
homepageRouter.post('/update', adminAuth, upload.fields([
    { name: 'editorialBackdrop', maxCount: 1 },
    { name: 'editorialBlock1', maxCount: 1 },
    { name: 'editorialBlock2', maxCount: 1 },
    { name: 'editorialBlock3', maxCount: 1 },
    { name: 'firstSplitLeft', maxCount: 1 },
    { name: 'firstSplitRight', maxCount: 1 },
    { name: 'splitLeft', maxCount: 1 },
    { name: 'splitRight', maxCount: 1 },
]), updateHomepageConfig);

export default homepageRouter;
