import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './src/db/index.js';
import dotenv from 'dotenv';
import authRouter from './src/routes/auth/auth.routes.js';
import adminProductRouter from './src/routes/admin/products.route.js';


dotenv.config(
    {
        path:'./.env',

    }
);

connectDB();


const app = express();

const port = process.env.PORT || 5000;
app.use(
    cors({
        // 
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders :['Content-Type', 'Authorization', 'Cache-Control','Expires','Pragma'],
        credentials: true,
    }),
);

app.use(cookieParser());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('hello from backend');
})



app.use('/api/auth',authRouter);
app.use('/api/admin/product',adminProductRouter);



app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});



app.listen(port,()=>{
    console.log(`listening on port http://localhost:${port}`);
})
