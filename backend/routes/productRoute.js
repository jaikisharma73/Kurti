import express from 'express'
import { listProducts, addProduct, removeProduct, singleProduct, editProduct, addProductReview, deleteProductReview } from '../controllers/productController.js'
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

import authUser from '../middleware/auth.js';

const productRouter = express.Router();

productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
productRouter.post('/remove',adminAuth,removeProduct);
productRouter.post('/single',singleProduct);
productRouter.post('/edit',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),editProduct);
productRouter.get('/list',listProducts)
productRouter.post('/review/delete', adminAuth, deleteProductReview)
productRouter.post('/review/:id', authUser, addProductReview)

export default productRouter