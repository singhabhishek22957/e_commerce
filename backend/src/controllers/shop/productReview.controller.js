import { Order } from "../../models/order.model.js";
import { Product } from "../../models/product.model.js";
import { ProductReview } from "../../models/review.model.js";


const addProductReview = async (req,res)=>{
    
    const {productId, reviewValue, reviewMessage, userId, username} = req.body;
    console.log("req.body", req.body);
    
    try {
        const order = await Order.find({
            userId,
            "cartItems.productId":productId,
            orderStatus:"delivered"
        });

        if(!order){
            return res.status(400).json({
                success: false,
                message: "you have not ordered this product yet",
                error:"you need to order this product first"
            })
        }

        const existingReview = await ProductReview.findOne({
            productId,
            userId
        });

        if(existingReview){
            return res.status(400).json({
                success: false,
                message: "you have already reviewed this product",
                error:"you have already reviewed this product"
            })
        }

        const review = await ProductReview.create({
            productId,
            reviewValue,
            reviewMessage,
            userId,
            username
        });

        const reviews = await ProductReview.find({
            productId
        });

        const totalReviewsLength = reviews.length;

        const totalRating = reviews.reduce((acc, item) => acc + item.reviewValue, 0);

        await Product.findOneAndUpdate({
            _id: productId
        }, {
            totalRating: totalRating / totalReviewsLength
        }, {
            new: true
        })

        res.status(200).json({
            success: true,
            message: "Product review added successfully",
            data: review,
        })
        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
        
        
    }
}


const getProductReview = async (req,res)=>{
    const {productId} = req.params;
    try {
        const reviews = await ProductReview.find({
            productId
        });
        if(!reviews){
            return res.status(400).json({
                success: false,
                message: "Product review not found",
                error:"Product review not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Product review fetched successfully",
            data: reviews,
        })
        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        })
        
        
    }
}

export{
    addProductReview,
    getProductReview
}