import dotenv from 'dotenv';
dotenv.config({path : '../.env'});
import mongoose from "mongoose";
import Review from '../models/reviewSchema.js'
import Product from '../models/productSchema.js';


const MONGO_URL = process.env.MONGO_URL;


export const products = [
 
  {
    "name": "DermaFit Hair Oil",
    "slug": "dermaFit-hair-oil",
    "description": "A nourishing hair oil that strengthens roots and promotes healthy, shiny hair.",
    "price": 599,
    "discountPercentage": 20,
    "category": "haircare",
    "subCategory": "hair-oil",
    "skinType": [],
    "ingredients": [
      "argan oil",
      "castor oil"
    ],
    "images": "https://res.cloudinary.com/djbvudn3u/image/upload/v1785146912/oil_f8jpjn.avif",
    "stock": 25,
    "ratingAvg": 5,
    "numReviews": 421,
    "isBestseller": true,
    "isNewArrival": false,
    
  },
  {
    "name": "Lipstick NudeTouch01",
    "slug": "lipstick-nudetouch-01",
    "description": "A creamy nude lipstick with long-lasting color and a smooth matte finish.",
    "price": 799,
    "discountPercentage": 15,
    "category": "makeup",
    "subCategory": "lipstick",
    "skinType": [
      "all"
    ],
    "ingredients": [
      "vitamin e",
      "jojoba oil"
    ],
    "images": "https://res.cloudinary.com/djbvudn3u/image/upload/v1785147812/lipstick_gxfser.avif",
    "stock": 40,
    "ratingAvg": 5,
    "numReviews": 658,
    "isBestseller": true,
    "isNewArrival": true,
    
  },
  {
    "name": "Soft Premium colored Brushes",
    "slug": "soft-premium-brushes-01",
    "description": "A premium makeup brush set for seamless blending and flawless application.",
    "price": 2999,
    "discountPercentage": 30,
    "category": "tools",
    "subCategory": "brushes",
    "skinType": [
      "all"
    ],
    "ingredients": [],
    "images": "https://res.cloudinary.com/djbvudn3u/image/upload/v1785147900/brushes_bf8d0o.avif",
    "stock": 35,
    "ratingAvg": 5,
    "numReviews": 284,
    "isBestseller": true,
    "isNewArrival": false,
   
  },
  {
    "name": "Brightening Serum",
    "slug": "serum-bright",
    "description": "A lightweight facial serum that deeply hydrates and brightens the skin.",
    "price": 499,
    "discountPercentage": 25,
    "category": "skincare",
    "subCategory": "serum",
    "skinType": [
      "dry",
      "normal"
    ],
    "ingredients": [
      "niacinamide",
      "hyaluronic acid"
    ],
    "images": "https://res.cloudinary.com/djbvudn3u/image/upload/v1785148036/serum_jmngvx.avif",
    "stock": 28,
    "ratingAvg": 5,
    "numReviews": 512,
    "isBestseller": true,
    "isNewArrival": false,
    
  },
  {
    "name": "Mascara Black",
    "slug": "mascara-black",
    "description": "To darken, thicken, lengthen, and define eyelashes.",
    "price": 999,
    "discountPercentage": 15,
    "category": "makeup",
    "subCategory": "mascara",
    "skinType": [
      "all"
    ],
    "ingredients": [
      "rose extract",
      "vitamin e"
    ],
    "images": "https://res.cloudinary.com/djbvudn3u/image/upload/v1783852941/WY_60SLEM-Bailey_062023_1_esaho6.jpg",
    "stock": 18,
    "ratingAvg": 5,
    "numReviews": 836,
    "isBestseller": true,
    "isNewArrival": true
  }
];


async function seed(){
  try{
  await mongoose.connect(MONGO_URL);
  console.log("connected to mongoDb");

  await Product.insertMany(products);
  console.log("DONE");
}finally{
  await mongoose.disconnect();

}

}

seed().catch(console.error);