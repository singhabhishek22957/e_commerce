import {v2 as cloudinary} from 'cloudinary';
import { handleImageUpload } from '../../helpers/cloudinary.js';

const handleImage= async(req,res)=>{
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await handleImageUpload(url);
        console.log("result",result);
        res.status(200).json({success:true,message:"Image uploaded successfully",data:result})
        
    } catch (error) {
        console.log("error",error  );
        res.status(500).json({success:false,message:"Internal Server Error",error:error})
    }
}


export {handleImage}