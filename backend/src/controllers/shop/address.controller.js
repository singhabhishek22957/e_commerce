import { Address } from "../../models/address.model.js";

const addAddress = async (req, res) => {
  const { userId, address, city, state, country, pincode, notes, contact } =
    req.body;
  try {
    if (!userId || !address || !state || !pincode || !contact) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const newCreatedAddress = await Address.create({
      userId,
      address,
      city,
      state,
      country,
      pincode,
      notes,
      contact,
    });

    if (!newCreatedAddress) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    res.status(200).json({
      success: true,
      message: "Address added successfully",
      data: newCreatedAddress,
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
const fetchedAllAddress = async (req, res) => {
  const { userId } = req.params;
  try {
    const address = await Address.find({ userId });
    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    res.status(200).json({
      success: true,
      message: "Address fetched successfully",
      data: address,
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
const updateAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  const { address, city, state, country, pincode, notes, contact } = req.body;
  try {
    const updateAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      { address, city, state, country, pincode, notes, contact },
      { new: true }
    );

    if (!updateAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updateAddress,
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
const deleteAddress = async (req, res) => {
  const { userId, addressId } = req.params;
  try {
    const deletedAddress = await Address.findOneAndDelete({
      _id: addressId,
      userId,
    });
    if (!deletedAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: deletedAddress,
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

export { addAddress, fetchedAllAddress, updateAddress, deleteAddress };
