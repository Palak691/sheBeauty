import ExpressErr from '.././utils/ExpressErr.js'
import Product from "../models/productSchema.js";
import Wishlist from "../models/wishlistSchema.js";


export const addToWishlist = async (req,res)=>{
    
   const {productId} = req.body;
   const product = await Product.findById(productId);
   if(!product){
    throw new ExpressErr(404, "Product do not Found!")
   }
   let wishlist = await Wishlist.findOne({userId : req.user._id});
   if(!wishlist){
    wishlist = await Wishlist.create({
        userId : req.user._id,
        items : [
            {product : productId}
        ]
    })
   }else{
     const alreadyExists = wishlist.items.find((item)=>item.product.toString() ===  productId);
     if(alreadyExists){
       throw new ExpressErr(400, "Product already in wishlist")
     }
   
   wishlist.items.push({
    product : productId
   });
   await wishlist.save();
}
   await wishlist.populate('items.product','name price images discountPercentage stock ratingAvg');
   return res.status(201).json({ message : "Added to wislist", wishlist});
    
}




export const getWishlist = async (req,res)=>{
    
  const wishlist = await Wishlist.findOne({
    userId : req.user._id
  }).populate('items.product', 'name price images discountPercentage stock ratingAvg')
  
  if(!wishlist){
     return res.status(200).json({ success: true, message: "Wishlist is empty",
        wishlist: {
          userId: req.user._id,
          items: [],
        },
      });
  }
    return res.status(200).json({
      wishlist,
    });

}



export const removeWishlist = async (req,res)=>{
    
    const {productId} = req.params;
    const wishlist = await Wishlist.findOne({
        userId : req.user._id
    });
    if (!wishlist) {
      return res.status(404).json({  success: false,  message: "Wishlist not found",});
    }

    const exists = wishlist.items.find(
     (item)=> item.product.toString() === productId);
     if(!exists){
      throw new ExpressErr(404, "Product not found in wishlist")
     }

     wishlist.items = wishlist.items.filter((item)=>item.product.toString() !== productId);
     wishlist.save();
       await wishlist.populate(
      "items.product",
      "name price images discountPercentage stock ratingAvg"
    );

    return res.status(200).json({
      message: "Removed from wishlist",  wishlist, });

}