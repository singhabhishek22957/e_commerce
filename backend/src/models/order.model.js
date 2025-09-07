import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cartId:{
        type: Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
    },
    cartItems:[{
        productId:{
            type:String,
            required:true
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    }],
    addressId: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    orderStatus: {
        type: String,
        default: "pending",
    },
    paymentStatus: {
        type: String,
        default: "pending",
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
    },
    orderUpdate: {
        type: Date,
    },
    paymentId: {
        type: String,
    },
    payerId: {
        type: String,
    },
},{timestamps: true});

export const Order = mongoose.model("Order", orderSchema);