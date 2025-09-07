import mongoose, { Schema } from "mongoose";

const productReviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    reviewValue: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    reviewMessage: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
},{timestamps: true});


export const ProductReview = mongoose.model("ProductReview", productReviewSchema);