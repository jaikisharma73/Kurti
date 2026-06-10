import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"
import userModel from "../models/userModel.js"
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added." })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const editProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subCategory, sizes, bestseller, imageSlots } = req.body

        const product = await productModel.findById(id)
        if (!product) {
            return res.json({ success: false, message: "Product not found" })
        }

        let imagesUrl = [];

        if (imageSlots) {
            const slots = JSON.parse(imageSlots);
            imagesUrl = await Promise.all(
                slots.map(async (slot, idx) => {
                    if (slot.type === 'existing') {
                        return slot.url;
                    } else if (slot.type === 'new') {
                        const file = req.files?.[`image${idx + 1}`] && req.files[`image${idx + 1}`][0];
                        if (file) {
                            let result = await cloudinary.uploader.upload(file.path, { resource_type: 'image' });
                            return result.secure_url;
                        }
                    }
                    return null;
                })
            );
            imagesUrl = imagesUrl.filter(url => url !== null);
        } else {
            const image1 = req.files?.image1 && req.files.image1[0]
            const image2 = req.files?.image2 && req.files.image2[0]
            const image3 = req.files?.image3 && req.files.image3[0]
            const image4 = req.files?.image4 && req.files.image4[0]

            const newImages = [image1, image2, image3, image4].filter((item) => item !== undefined)

            imagesUrl = product.image

            if (newImages.length > 0) {
                imagesUrl = await Promise.all(
                    newImages.map(async (item) => {
                        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                        return result.secure_url
                    })
                )
            }
        }

        const updateData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
        }

        await productModel.findByIdAndUpdate(id, updateData)
        res.json({ success: true, message: "Product Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
const addProductReview = async (req, res) => {
    try {
        const { rating, comment, userId } = req.body;
        const productId = req.params.id;

        const product = await productModel.findById(productId);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        const alreadyReviewed = product.reviews.find(
            (r) => r.userId.toString() === userId.toString()
        );

        if (alreadyReviewed) {
            return res.json({ success: false, message: "Product already reviewed" });
        }

        const user = await userModel.findById(userId);

        const review = {
            name: user.name,
            userId,
            rating: Number(rating),
            comment,
            date: Date.now()
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();
        res.json({ success: true, message: "Review added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
const deleteProductReview = async (req, res) => {
    try {
        const { productId, reviewId } = req.body;

        const product = await productModel.findById(productId);

        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        product.reviews = product.reviews.filter(
            (r) => r._id.toString() !== reviewId.toString()
        );

        product.numReviews = product.reviews.length;

        if (product.reviews.length > 0) {
            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;
        } else {
            product.rating = 0;
        }

        await product.save();
        res.json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, editProduct, addProductReview, deleteProductReview }