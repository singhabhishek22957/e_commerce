import { Product } from "../../models/product.model.js";

const searchProducts = async (req, res) => {
  try {
    const {keyword} = req.params;

    if(!keyword || typeof keyword !== 'string') {
        return res.status(400).json({
            success:false,
            message:"Please provide a search keyword and must be a string",
            error:"Please provide a search keyword and must be a string"
        }) 
    }

    const regex = new RegExp(keyword, 'i');

    const createSearchQuery = {
        $or:[
            {title:regex},
            {description:regex},
            {category:regex},
            {brand:regex}
        ]
    }

    const searResult = await Product.find(createSearchQuery);

    res.status(200).json({
        success:true,
        message:"Search result fetched successfully",
        data:searResult
    })
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};


export {
  searchProducts,

}
