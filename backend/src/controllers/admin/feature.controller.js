import { Feature } from "../../models/feature.model.js";

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;
    
    if (!image)
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    const featureImages = await Feature.create({ image });

    if (!featureImages) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    res.status(200).json({
      success: true,
      message: "Feature image added successfully",
      data: featureImages,
    });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const featureImages = await Feature.find({});

    if (!featureImages) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    res.status(200).json({
      success: true,
      message: "Feature images fetched successfully",
      data: featureImages,
    });

  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};

export { addFeatureImage, getFeatureImages };
