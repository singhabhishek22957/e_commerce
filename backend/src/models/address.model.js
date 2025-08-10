import mongoose, { Schema } from "mongoose";


const addressSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city:{
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    pincode: {
        type: String,
    },
    notes: {
        type: String,
    },
    contact: {
        type: String,
    },
},{timestamps: true});



export const Address = mongoose.model("Address", addressSchema);