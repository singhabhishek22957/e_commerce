import {Router} from "express";
import { addFeatureImage, getFeatureImages } from "../../controllers/admin/feature.controller.js";



const router = Router();

router.get("/get",getFeatureImages);
router.post("/add", addFeatureImage)


export default router