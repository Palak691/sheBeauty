import ExpressErr from '.././utils/ExpressErr.js'
import Product from "../models/productSchema.js";



function encodeCursor(createdAt, id) {

  const cursorObject = {
    createdAt: createdAt.toISOString(), 
    id: id.toString(),                  
  };
  

  const jsonString = JSON.stringify(cursorObject);

  const base64Cursor = Buffer.from(jsonString, "utf8").toString("base64url");

  return base64Cursor;
}




function decodeCursor(cursorString) {
try{
    const jsonString = Buffer.from(cursorString, "base64url").toString("utf8");
    const cursorObject = JSON.parse(jsonString);
    return {
      createdAt: new Date(cursorObject.createdAt),
      id: cursorObject.id,                          
    };

}catch{
    return null;
}
}

//admin 
export const createProduct = async(req,res)=>{
    
    const {name, slug, description, category, subCategory,
           price, discountPercentage, stock, isBestseller, isNewArrival} = req.body;

    const ingredientsRaw  = req.body['ingredients[]'];//arry filed
    const ingredients = Array.isArray(ingredientsRaw) ? ingredientsRaw : [ingredientsRaw].filter(Boolean)

        if(!name || !slug || !price || !category){
            return res.status(400).json({success : false, message  : "name, price and category are required!"});
       }

    const existingProduct = await Product.findOne({slug});
    if(existingProduct) return res.status(400).json({message : "Product already exists!"});
    let images = '';
    if(req.file){
        images = req.file.path//multer- cloudinary
    }
    const newProduct = await Product.create({
    name,
    slug,
    description,
    category,
    subCategory,
    price,
    discountPercentage,
    stock,
    ingredients,
    isBestseller: isBestseller === 'true',
    isNewArrival: isNewArrival === 'true',
    images
    });
    return res.status(201).json({success :  true , message : "New Product Created!" , newProduct});

}

export const updateProduct =  async(req,res)=>{
    
    const {
    name, slug, description, category, subCategory,
    price, discountPercentage, stock, isBestseller, isNewArrival} = req.body;

    const ingredientsRaw = req.body['ingredients[]'];
     const updateData = {//partal update
    ...(name !== undefined && { name }),
    ...(slug !== undefined && { slug }),
    ...(description !== undefined && { description }),
    ...(category !== undefined && { category }),
    ...(subCategory !== undefined && { subCategory }),
    ...(price !== undefined && { price }),
    ...(discountPercentage !== undefined && { discountPercentage }),
    ...(stock !== undefined && { stock }),
    ...(isBestseller !== undefined && { isBestseller: isBestseller === 'true' }),
    ...(isNewArrival !== undefined && { isNewArrival: isNewArrival === 'true' }),
  };
   
    if (ingredientsRaw !== undefined) {
     updateData.ingredients = Array.isArray(ingredientsRaw) ? ingredientsRaw : [ingredientsRaw].filter(Boolean);
    }

    // only touch images if a new file was actually uploaded
    if (req.file) {
      updateData.images = req.file.path;
     }

    const product = await Product.findByIdAndUpdate(req.params.id , updateData,  {
      new: true,
      runValidators: true,
    });

    if(!product) return res.status(404).json({message : "Product not found!"});
    res.status(200).json({success:  true, message: "Product updated successfully.", product,});
    
}


export const deleteProduct = async (req,res) => {
    
    const productToDelete = await Product.findByIdAndDelete(req.params.id);
    if(!productToDelete) return res.status(404).json({message : "Product not found!"});

    return res.status(200).json({success :  true, message : "Product Deleted!"});
   
}



//user route
export const getProducts = async(req,res)=>{
    const requestedLimit = Number(req.query.limit);
    const limit = Number.isInteger(requestedLimit) && requestedLimit > 0 ?
    Math.min(requestedLimit , 50) : 12;
    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    const {cursor , category, skinType , search} = req.query;
    
    const filter = {};
    if(category){
        filter.category = category
    }
    if(skinType){
        filter.skinType = skinType
    }
    if(search){
        filter.name = {
            $regex : search,
            $options : "i"
        }
    }
   if(!isNaN(minPrice) || !isNaN(maxPrice)){
      filter.price = {};
      if(!isNaN(minPrice)){
        filter.price.$gte = minPrice;
      }
      if(!isNaN(maxPrice)){
        filter.price.$lte = maxPrice;
      }
   }
    if(cursor){
        const decodedCursor = decodeCursor(cursor);
        if(decodedCursor ===  null){
            return res.status(400).json({message : "Invalid Cursor"});
        }
    
    filter.$or = [
        {createdAt : {$lt : decodedCursor.createdAt}},
        {
            createdAt : decodedCursor.createdAt,
            _id : {$lt: decodedCursor.id}

        }
    ]
    }

    const fetchedDocs = await Product.find(filter)
    .sort({createdAt : -1 , _id : -1})
    .limit(limit+1)
    .lean()
    // .explain("executionStats");
    // IXSCAN → MongoDB is scanning an index.
  
    let nextCursor = null;
    const hasNextPage = fetchedDocs.length >  limit ;
    const productsToReturn = hasNextPage ? fetchedDocs.slice(0,limit) : fetchedDocs;

    if(hasNextPage && productsToReturn.length > 0){
        let lastProduct = productsToReturn[productsToReturn.length-1];
        nextCursor = encodeCursor(lastProduct.createdAt, lastProduct._id);
    }

    return res.json({
        hasMore : hasNextPage,
        products : productsToReturn,
        nextCursor : nextCursor
    });
    
}


export const getAllCategories = async (req,res)=>{

        const categoriesList = await Product.distinct('category');
        categoriesList.sort();
        return res.status(200).json({success : true, category : categoriesList});

}



export const getProductBySlug = async (req,res)=>{
    
    const product = await Product.findOne({slug:req.params.slug});
    if(!product) throw new ExpressErr(404, "No Product Found")
     res.status(200).json({
      success: true,
      product 
    });
  
};

//bestSeller

export const isBestsellerProducts = async(req,res)=>{
  
    const isBestseller = await Product.find( {
      $and : [
        {isBestseller :  true},
        {ratingAvg : {$gte : 4.9}}
      ]
    } ).limit(5).sort({createdAt : -1})
 return res.status(200).json({success : true, isBestseller });

}
export const getAllBestsellers = async (req,res, next)=>{
  
    const allBestseller = await Product.find({isBestseller :  true}).limit(25)
    return res.status(200).json({success : true, allBestseller });
      

}
//Gallery
export const getProductsBySlugs = async (req, res, next) => {
  
    const slugs = req.query.slugs?.split(',').map(s => s.trim()).filter(Boolean);
    if (!slugs || slugs.length === 0) {
      throw new ExpressErr(400, "Slug query param is required");
    }
    const products = await Product.find({ slug: { $in: slugs } });
    return res.status(200).json({ success: true, products });
  
};



export const getProductById = async (req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    if(!product) throw new ExpressErr(404, "No Product Found")
     res.status(200).json({
      success: true,
      product 
    });
}