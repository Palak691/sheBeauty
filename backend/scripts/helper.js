import dotenv from 'dotenv';
// dotenv.config({ path: '../.env' });
dotenv.config({path : '../.env'});
import Gift from "../models/giftSchema.js";
import mongoose from 'mongoose';


const MONGO_URL = process.env.MONGO_URL



export const freeGifts = [
  {
    name: "Scarf, Sunglasses & Lip Balm Set",
    description: "A stylish summer essentials combo.",
    image: "https://res.cloudinary.com/djbvudn3u/image/upload/v1785045944/all_dunld6.avif",
    stock: 100,
    minOrderValue: 2999,
  },
  {
    name: "Purse & Sunglasses Combo",
    description: "Premium lime green purse with matching sunglasses.",
    image: "https://res.cloudinary.com/djbvudn3u/image/upload/v1785045945/combo_y2eycc.avif",
    stock: 100,
    minOrderValue: 2999,
  },
  {
    name: "Sun Hat",
    description: "Wide-brim UV protection summer hat.",
    image: "https://res.cloudinary.com/djbvudn3u/image/upload/v1785046343/hat_s6r7s6.avif",
    stock: 100,
    minOrderValue: 999,
  },
  {
    name: "Cotton Cap",
    description: "Comfortable cap with UV protection.",
    image: "https://res.cloudinary.com/djbvudn3u/image/upload/v1785045945/cap_z64at3.avif",
    stock: 100,
    minOrderValue: 999,
  },
  {
    name: "UV Protection Sunglasses 2",
    description: "Stylish sunglasses with UV protection.",
    image: "https://res.cloudinary.com/djbvudn3u/image/upload/v1785045946/uv_glasses_uiogw3.avif",
    stock: 100,
    minOrderValue: 999,
  },
  {
    name: "Tinted Lip Balm",
    description: "Hydrating pink lip balm.",
    image: "https://res.cloudinary.com/djbvudn3u/image/upload/v1785045944/lipbalm_u18nms.avif",
    stock: 100,
    minOrderValue: 0,
  },
  {
    name: "Gel Face Wash",
    description: "Gentle cleanser suitable for all skin types.",
    image: "https://res.cloudinary.com/djbvudn3u/image/upload/v1785045945/gelWash_kjgc6j.avif",
    stock: 100,
    minOrderValue: 1599,
  },
];


async function addFreeGifts(){
    try{
        await mongoose.connect(MONGO_URL);
        try{
            await Gift.deleteMany({})
        }catch{}
         
        await Gift.insertMany(freeGifts);
          console.log("Done")
    }catch(err){
        console.error(err)
    }
    
}


addFreeGifts()