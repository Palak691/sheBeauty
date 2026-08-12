import Order from "../models/orderSchema.js"
import Product from "../models/productSchema.js"
import User from "../models/userSchema.js"

export const getdashboardData = async(req , res)=>{

    const [
        totalProducts, totalUsers, totalOrders, pendingOrders,
        deliveredOrders, lowStockProducts, revenue, recentOrders] = await Promise.all([
         Product.countDocuments(), 
         User.countDocuments(),
         Order.countDocuments(),
         Order.countDocuments({ status: "pending"  }),

         Order.countDocuments({status: "delivered"  }),

         Product.countDocuments({ stock: { $lte: 5 } }),

         Order.aggregate([
        {
            $match: {
                status: "delivered"
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: "$totalPrice"
                }
            }
        }
    ]),

      Order.find()
         .select("userId totalPrice status createdAt")
        .populate("userId", "name")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
    
])

return res.status(200).json({
        success: true,
        dashboard: {
            totalProducts,
            totalUsers,
            totalOrders,
            pendingOrders,
            deliveredOrders,
            lowStockProducts,
            totalRevenue: revenue[0]?.totalRevenue || 0,
            recentOrders
        }
    });
}