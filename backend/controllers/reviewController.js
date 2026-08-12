import ExpressErr from '.././utils/ExpressErr.js'
import Product from "../models/productSchema.js";
import Review from "../models/reviewSchema.js";


export const getAllReview = async (req,res)=>{
    const allReviews = await Review.find({})
    .populate('userId', 'name email')
    return res.status(200).json({allReviews : allReviews});
}

export const addReview = async(req,res)=>{
    // const productSlug = req.params.slug;
    const {rating, review, skinType ,slug} = req.body;

        const product = await Product.findOne({slug : slug});
        if(!product) throw new ExpressErr(404, "No Product Found");
        const existingReview = await Review.findOne({
              userId:req.user._id,
              productId:product._id
         });

      if(existingReview){
           return res.status(400).json({ message:"You already reviewed this product."});
       }
        if(!rating || !review){
            return res.status(400).json({message : "rating and review are required"});
        }

    
        const newReview = await Review.create({
            userId : req.user._id,
            productId : product._id,
            rating,
            comment : review,
            skinType
        });
        return res.status(201).json({success : true, message : "Thank You, Review Added !", review : newReview});
    }


export const getReviewByProductId = async (req, res) => {
    const productId = req.params.productId;

    const review = await Review.find({ productId })
        .populate("userId", "name email");

    return res.status(200).json({
        success: true,
        message: review.length
            ? "Review found successfully."
            : "No reviews yet.",
        review
    });
};

export const deleteReview = async(req,res)=>{
    const reviewId = req.params.productId;
    const review = await Review.findById(reviewId);

   if(!review){
        throw new ExpressErr(403, "Review not found");
    }
    if(String(review.userId) !== String(req.user._id)){
        throw new ExpressErr(403, "You can delete your own review only")
    }

   await review.deleteOne();
   return res.status(200).json({success: true,message: "Review deleted successfully."});
    
}


export const editReview = async(req,res)=>{
    const reviewId = req.params.id;
    const {rating, comment, skinType} = req.body;

        const review = await Review.findById(reviewId);

        if(!review) throw new ExpressErr(404 , "No Review Found");
            
        if(String(review.userId) !== String(req.user._id)){
            throw new ExpressErr(403, "You cab modify your own review only")
         }
          const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { $set: { rating, comment, skinType } },
            { new: true, runValidators: true } // Options: returns updated doc and runs schema validations
        );
         
        return res.status(200).json({message : "Review Edited Successfully!" , review : updatedReview});

    
}