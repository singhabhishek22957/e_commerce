
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import  {User} from "../../models/user.model.js";


// register
const registerUser = async (req,res)=>{
    console.log("Hello new user your data is ", req.body);
    
    const {username , name , email , password} = req.body;

    try {
        if(!username || !name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields",
            })
        }
        console.log("password hashing started");
        
        const hashedPassword = await bcrypt.hash(password,12);
        console.log("password hashing completed");
        
        const user = await User.findOne({
            username:username
        })
        console.log("user found", user);
    
        if(user!=null){
            console.log('User already exists', user);
            
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        console.log("User not found");
        

        const newUser = await User.create({
            username,
            name,
            email,
            password:hashedPassword,
        })
        console.log("User created successfully",newUser);
        
        const userCreated = await User.findById(newUser._id).select("-password");
        if(!userCreated){
            return res.status(400).json({
                success:false,
                message:"Something found error to create user"
            })
        }
        res.status(201).json({
            success:true,
            message:"Registration Successfully",
            data:userCreated,
        })

     
    } catch (error) {
        console.log(error);
        
       res.status(500).json({
        success:false,
        message:"Internal Server Error",
        error:error,

       }) 
    }
}
// login

const loginUser = async (req,res)=>{
    const {email , password} = req.body;
    console.log("req.body",req.body);
    
    try {
        console.log("login try block start");
        
        const user = await User.findOne({
            email:email
        })
        
        console.log("user found", user);
        
        if(!user){
            return res.json({
                success:false,
                message:"User not found",
            })
        }
        console.log("User found");
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Password not match",
            })
        }
        console.log("Password match");
        
        const token = jwt.sign({
            id:user._id,
            role:user.role,
            email:user.email,
            name:user.name,
        },process.env.JWT_SECRET_KEY,{expiresIn:"60m"});
        res.cookie("token",token,{httpOnly:true,secure:true}).json({
            success:true,
            message:"Login Successfully",
            data:{
                id:user._id,
                role:user.role,
                email:user.email,
                name:user.name,
                username:user.username,
            }
        })
        console.log("Login Successfully");
        
    
        
     
    } catch (error) {
        console.log(error);
        
       res.status(500).json({
        success:false,
        message:"Internal Server Error",
        error:error,

       }) 
    }
}

// logout

const logoutUser = async (req,res)=>{
    try {
        res.clearCookie("token");
        res.status(200).json({
            success:true,
            message:"Logout Successfully",
        })
     
    } catch (error) {
        console.log(error);
        
       res.status(500).json({
        success:false,
        message:"Internal Server Error",
        error:error,

       }) 
    }
}





// auth middleware

const authMiddleware = async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized Access",
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:"Unauthorized Access",
        })
        
    }
}

export {
    registerUser,
    loginUser,
    logoutUser,
    authMiddleware,
}