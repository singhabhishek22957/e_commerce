import mongoose, { Schema } from "mongoose";


const featureSchema = new Schema({
    image: {
        type: String,
    }
},{timestamps: true});


export const Feature = mongoose.model("Feature", featureSchema);
