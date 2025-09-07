import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './src/db/index.js';
import dotenv from 'dotenv';
import authRouter from './src/routes/auth/auth.routes.js';
import adminProductRouter from './src/routes/admin/products.route.js';
import shopProductsRouter from './src/routes/shop/product.route.js';
import shopCartRouter from './src/routes/shop/cart.route.js';
import addressRouter from './src/routes/shop/address.route.js';
import orderRouter from './src/routes/shop/order.route.js';
import adminOrderRouter from './src/routes/admin/order.route.js';
import shopSearchRouter from './src/routes/shop/search.route.js';
import shopReviewRouter from './src/routes/shop/review.route.js';
import featureRouter from './src/routes/common/feature.route.js';

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
        origin: process.env.FRONTEND_URL,
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
app.use('/api/admin/order',adminOrderRouter);



app.use('/api/shop/product',shopProductsRouter);
app.use('/api/shop/cart',shopCartRouter);
app.use('/api/shop/address',addressRouter);
app.use('/api/shop/order',orderRouter);
app.use('/api/shop/search',shopSearchRouter);
app.use('/api/shop/review',shopReviewRouter);

app.use('/api/common/feature',featureRouter);



app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});



app.listen(port,()=>{
    console.log(`listening on port http://localhost:${port}`);
})
