import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
    date: { type: Number, required: true },
    reviews: [
        {
            userId: { type: String, required: true },
            name: { type: String, required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true },
            date: { type: Number, required: true }
        }
    ],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
})

const productModel  = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel