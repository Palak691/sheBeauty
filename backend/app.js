import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import reviewRouter from './routes/reviewRoute.js'
import orderRouter from './routes/orderRoute.js'
import cartRouter from './routes/cartRoute.js'
import wishlistRouter from './routes/wishlistRoute.js';
import giftRouter from './routes/giftRoute.js'
import dashboardRouter from './routes/dashboard.js'

const app = express();
const PORT = process.env.PORT || 8000;



app.use(cors({
  origin: "https://she-beauty-nelu.vercel.app",
  credentials: true
}));

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.get('/',(req,res)=>{
  res.send("im root");
});

app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/review', reviewRouter);
app.use('/order', orderRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRouter);
app.use('/gift', giftRouter);
app.use('/admin', dashboardRouter)

app.use((req,res)=>{
  res.status(404).json({message : "Route not Found!"});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong'
  res.status(statusCode).json(message);
});

const start = async () => {
    try{
         await mongoose.connect(process.env.MONGO_URL);
         console.log("mongodb connected");
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));

    }catch(err){
      console.log('err occurred', err);
    } 

}

start(); 