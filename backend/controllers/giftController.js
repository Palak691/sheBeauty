import Gift from "../models/giftSchema.js"



export const getAllGifts = async(req , res)=>{
        const gifts = await Gift.find({});
        return res.status(200).json({success: true  , gifts});
}

