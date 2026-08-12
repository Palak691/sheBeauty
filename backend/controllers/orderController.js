import ExpressErr from '.././utils/ExpressErr.js'
import Cart from "../models/cartSchema.js";
import Order from "../models/orderSchema.js"
import Profile from "../models/profileSchema.js";

export const createOrder = async (req, res) => {

    const { paymentMethod } = req.body;

    // Validate payment method
    if (!["COD"].includes(paymentMethod)) {
        throw new ExpressErr(400, "Invalid payment method");
    }

    // Get user's cart
    const cart = await Cart.findOne({
        userId: req.user._id
    })
        .populate("items.product")
        .populate("userId", "name")
        .populate("gift");

    if (!cart || cart.items.length === 0) {
        throw new ExpressErr(400, "Your cart is empty");
    }

    // Get user's profile
    const profile = await Profile.findOne({
        userId: req.user._id
    });

    if (!profile || !profile.address || !profile.mobile_no) {
        throw new ExpressErr(
            400,
            "Please complete your shipping address"
        );
    }

    // Check stock before creating order
    for (const item of cart.items) {

        if (!item.product) {
            throw new ExpressErr(
                400,
                "One of the products in your cart no longer exists"
            );
        }

        if (item.quantity > item.product.stock) {
            throw new ExpressErr(
                400,
                `${item.product.name} does not have enough stock`
            );
        }
    }

    // Prepare order items
    const orderItems = cart.items.map((item) => {

        const product = item.product;

        const finalPrice =
            product.discountPercentage > 0
                ? Math.round(
                    product.price -
                    (product.price * product.discountPercentage) / 100
                )
                : product.price;

        return {
            product: product._id,
            name: product.name,
            price: finalPrice,
            quantity: item.quantity,
            image: product.images,
            slug: product.slug
        };
    });

    // Calculate prices
    const itemPrice = orderItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const shippingPrice = itemPrice > 999 ? 0 : 49;

    const totalPrice = itemPrice + shippingPrice;

    // Create order
    const newOrder = await Order.create({

        userId: req.user._id,

        items: orderItems,

        shippingAddress: {
            fullName: cart.userId.name,
            address: profile.address,
            city: profile.city || "New Delhi",
            mobile_no: profile.mobile_no
        },

        paymentMethod,

        itemPrice,
        shippingPrice,
        totalPrice,

        gift: cart.gift || null
    });

    // Decrease product stock
    for (const item of cart.items) {

        item.product.stock -= item.quantity;

        await item.product.save();
    }

    // Empty cart after successful order
    cart.items = [];
    cart.gift = null;

    await cart.save();

    return res.status(201).json({
        success: true,
        message: "Order placed successfully.",
        order: newOrder
    });
};

export const getMyOrder = async (req,res)=>{
      const myOrders = await Order.findOne({userId : req.user._id}).sort({ createdAt: -1 })
      .populate('gift' , 'name image')
      res.status(200).json({success: true, myOrders });
}


export const getOrderById = async (req,res)=>{
    
    const myOrder = await Order.findById({ _id: req.params.id,userId: req.user._id})
    .populate('userId', 'name email ')
    .populate('items.product')

    if (!myOrder)  throw new ExpressErr(404, "Order not Found!")
       
     res.status(200).json({  success: true,  myOrder });
}

export const getOrderHistory = async (req,res)=>{
    
    const myOrder = await Order.find({userId : req.user._id , status : "delivered"})
    .populate('userId', 'name email ')
    .populate('items.product')

      if (myOrder.length === 0) {
    throw new ExpressErr(404, "Order history not found!");
  }
       
     res.status(200).json({  success: true,  myOrder });
}



//admin


export const getAllCustomerOrders = async (req,res)=>{

     const customerOrders = await Order.find({})
        .populate("userId", "name email")
        .populate("items.product", "name images")
        .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: customerOrders.length, customerOrders});
}


export const getCustomerOrderbyId = async(req,res)=>{

    const customerOrder = await Order.findById(req.params.id)
    .populate('userId', 'name email ')
    .populate('items.product')

    if (!customerOrder)  throw new ExpressErr(404, "Order not Found!")
       
     res.status(200).json({  success: true,  customerOrder });


}

export const updateCustomerOrderStatus = async(req,res)=>{
    const { status} = req.body;

    const customerOrder = await Order.findById(req.params.id)
    if (!customerOrder)  throw new ExpressErr(404, "Order not Found!")
      const allowedStatuses = ["pending","processing","shipped","delivered","cancelled"];

    if (!allowedStatuses.includes(status)) {
    throw new ExpressErr(400, "Invalid order status");
  }

    customerOrder.status = status;
    await customerOrder.save();
       
    return res.status(200).json({ success: true, message: "Order status updated successfully.", customerOrder
    });

}

