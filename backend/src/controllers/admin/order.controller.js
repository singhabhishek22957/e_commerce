
import { Order } from "../../models/order.model.js";




const getOrderOfALLUser = async (req, res) => {
  
  try {
    const order = await Order.find();
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const updateOrderStatus =  async (req,res)=>{
    const {orderId, orderStatus} = req.params;

    try {
        const order = await Order.findByIdAndUpdate({
            _id:orderId
        },{
            orderStatus:orderStatus,
            orderUpdateDate:Date.now()
        },{new:true});
        if(!order){
            return res.status(404).json({success:false, message:"Order not found"});
        }
        res.status(200).json({success:true, message:"Order updated successfully", data:order});
      } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Internal Server Error", error:error});
        
      }
}

export {
  
  getOrderOfALLUser,
  getOrderById,
  updateOrderStatus,
};
