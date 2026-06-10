import express from 'express';
import { checkAbandonedCarts } from '../controllers/cronController.js';

const cronRouter = express.Router();

cronRouter.get('/abandoned-cart', checkAbandonedCarts);

export default cronRouter;
