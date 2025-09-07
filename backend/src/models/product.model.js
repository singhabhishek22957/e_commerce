import mongoose, { Schema } from "mongoose";



const productSchema = new Schema({
    image:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        
    },
    category:{
        type: String,
    },
    brand:{
        type:String,

    },
    price:{
        type: Number,
    },
    salePrice:{
        type: Number,
       
    },
    totalStock:{
        type: Number,
        required: true,
    },
    totalRating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5,
    }
},{timestamps: true});


export const Product = mongoose.model("Product", productSchema);