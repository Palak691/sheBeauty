import Cart from "../models/cartSchema.js";
import Gift from "../models/giftSchema.js";
import Order from "../models/orderSchema.js";
import Product from '../models/productSchema.js'
import Profile from "../models/profileSchema.js";
import ExpressErr from '.././utils/ExpressErr.js'


export const addToCart = async (req,res)=>{

        const {productId, quantity} = req.body;
        const product = await Product.findById(productId);
        if(!product){
            throw new ExpressErr(404, "Product not found!")
        }
        if(!Number.isFinite(quantity) || quantity < 1){
        throw new ExpressErr(400, "Quantity should be atleast 1");
        }
        if (quantity > product.stock) {
        throw new ExpressErr(400, "Not enough stock available");
          }
        let cart = await Cart.findOne({userId : req.user._id});
        if(!cart){
            cart = await Cart.create({
               userId : req.user._id,
               items : [{
                product : productId,
                quantity
               }
               ]
            });
        }else{
        const item =  cart.items.find((item)=> item.product.toString() === productId);//np await sync
        if(item){
            if(item.quantity + quantity > product.stock) {
                     throw new ExpressErr(400, "Not enough stock available");
                             }
        item.quantity += quantity;
        }else{
            cart.items.push({
                product : productId,
                quantity
            });
        }
    }
        await cart.save();
        await cart.populate('items.product', 'name price images discountPercentage isBestseller');

        return res.status(201).json({ success: true, message: "Product added to cart", cart});
   
}

export const getCart = async (req,res)=>{

    const cart = await Cart.findOne({userId : req.user._id})
    .populate('gift' , 'name image ')
    .populate('userId', 'name mobile_no address email ')
    .populate('items.product' , 'name price images stock discountPercentage slug isBestseller')
    const profile = await Profile.findOne({ userId: req.user._id });
  
    if(!cart){
           return res.status(404).json({ message: "Cart is Emptyy!", cart : {
            userId : req.user._id,
            items : []
    }});
    }

      return res.status(200).json({message: "Cart fetched successfully",  cart, profile});

}



export const updateCart = async (req,res)=>{
    
    const {productId , quantity} = req.body;
    const product = await Product.findById(productId);
    
    if (!product) {
        throw new ExpressErr(404, "Product not found!");
    }
    if(!Number.isFinite(quantity) || quantity < 1){
        throw new ExpressErr(400, "Quantity should be atleast 1");
    }
    if (quantity > product.stock) {
  throw new ExpressErr(400, "Not enough stock available");
}
    
    let cart = await Cart.findOne(
        {
           userId : req.user._id
        });
        if (!cart) {
          throw new ExpressErr(404, "Cart not found");
        }

       const item = cart.items.find((item)=>item.product.toString()===productId);
     
        if (!item) {
          throw new ExpressErr(404, "Product not found in cart");
        }
        item.quantity = quantity;
        await cart.save();
        await cart.populate('items.product' , "name price images stock discountPercentage isBestseller");
          return res.status(200).json({message: "Cart updated successfully", cart});


    
}


export const removeCart = async (req,res)=>{
        const {productId} = req.params;
    
        const cart = await Cart.findOne({
            userId: req.user._id
        });

        if (!cart) {
            throw new ExpressErr(404, "Cart not found")
        }

        
        const item = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (!item) {
            throw new ExpressErr(404, "Product not found in cart")

        }

        // Remove product from cart
        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();

        // Populate updated cart
        await cart.populate( "items.product", "name price images stock discountPercentage isBestseller");

        return res.status(200).json({ success: true, message: "Product removed from cart", cart });

   
}

export const selectGift = async(req,res)=>{
    
    const {giftId} = req.body;
    const gift = await Gift.findById(giftId);
     if (!gift) {
           throw new ExpressErr(404, "Gift not found");
        }
        const cart = await Cart.findOne({userId : req.user._id});
        if(!cart){
           throw new ExpressErr(404, "Cart not found");

        }
         const subtotal = cart.items.reduce((total, item) => {
        const { price, discountPercentage } = item.product;
        const finalPrice = discountPercentage > 0 ? price - (price * discountPercentage) / 100 : price;
        return total + finalPrice * item.quantity;
         }, 0);

        if (subtotal < gift.minOrderValue) { throw new ExpressErr(400,"Your order does not qualify for this gift");
        }
        cart.gift  = giftId;
        await cart.save();
        await cart.populate('gift')
        return res.status(200).json({success: true, cart });
   

}