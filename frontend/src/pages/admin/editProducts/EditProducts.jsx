import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getProductById, getProductBySlug, updateProduct } from '../../../config/redux/action/productAction';
import './EditProducts.css'
import { BackButton } from '../../../components/backbutton/BackButton';
export const EditProducts = () => {
    const {product} = useSelector((state)=>state.product);
    const {token} = useSelector((state)=>state.auth);
    const {id}  = useParams();
     
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getProductById({id, token}));
    },[dispatch,id])

    const [productData, setProductData] = useState({
       name: "",
       slug: "",
       description: "",
       category: "",
       subCategory: "",
       price: "",
       discountPercentage: "",
       stock: "",
       ingredients: [],
       isBestseller: false,
       isNewArrival: false
     });

  useEffect(() => {
    if (product) {
        setProductData({
            name: product.name || "",
            slug: product.slug || "",
            description: product.description || "",
            category: product.category || "",
            subCategory: product.subCategory || "",
            price: product.price || "",
            discountPercentage: product.discountPercentage || "",
            stock: product.stock || "",
            ingredients: product.ingredients || [],
            isBestseller: product.isBestseller || false,
            isNewArrival: product.isNewArrival || false
        });
    }
}, [product]);

function handleChange(e){
    const {name , value, type, checked } = e.target;
    setFormData((prev)=>({
        ...prev,
        [name] : type === 'checkbox' ? checked : value
    }));

}

async function handleSubmit(e){
 e.preventDefault();
 const payload = new FormData();
  payload.append("name", productData.name);
  payload.append("slug", productData.slug);
  payload.append("description", productData.description);
  payload.append("category", productData.category);
  payload.append("subCategory", productData.subCategory);
  payload.append("price", productData.price);
  payload.append("discountPercentage", productData.discountPercentage);
  payload.append("stock", productData.stock);
  payload.append("isBestseller", productData.isBestseller);
  payload.append("isNewArrival", productData.isNewArrival);

  productData.ingredients.forEach((ing)=> payload.append('ingredients[]', ing));

  if(image){
    payload.append('product_image', image);
  }

 await dispatch(updateProduct({
    id,
    payload,
 }));
   
}

  return (
    <div className='editProduct'>
      <BackButton/>
        <form action="" onSubmit={handleSubmit}>
         <h2>Edit Product</h2>
        <div className="productImage">
        <img src={product?.images} alt={product?.name}  /> 
          <input type="file" accept='image/*' name='product_image' onChange={(e)=> setImage(e.target.files[0])} />
        </div>
    <div>
        <label htmlFor="name">Product Name</label>
        <input type="text" name='name' id='name' value={productData.name} onChange={handleChange} />
        <label htmlFor="slug">Product Slug</label>
        <input type="text" name='slug' id='slug' value={productData.slug} onChange={handleChange} />
        <label htmlFor="description">Product Description</label>
        <textarea type="text" name='description' id='description' value={productData.description} onChange={handleChange} />
    </div>
    <div className="productPricing">
        <label htmlFor="price">Product Price</label>
        <input type="number" name='price' value={productData.price} onChange={handleChange} />
        <label htmlFor="discountPercentage">Product Discount</label>
        <input type="text" name='discountPercentage' id='discountPercentage' value={productData.discountPercentage} onChange={handleChange} />
        <label htmlFor="stock">Stocks</label>
        <input type="number" name='stock' id='stock' value={productData.stock} onChange={handleChange}/>
    </div>
       <div className='productCategory'>
        <label htmlFor="category">Product Category</label>
        <select name="category" id='category' value={productData.category} onChange={handleChange}>
          <option value="skincare">Skincare</option>
          <option value="haircare">Haircare</option>
          <option value="makeup">Makeup</option>
          <option value="tools">Tools</option>
        </select>
        <label htmlFor="subCategory">Product SubCategory</label>
        <input type="text" name='subCategory' id='subCategory' value={productData.subCategory}  onChange={handleChange}/>
        </div>  
         <div className="productDetails">
        <label htmlFor="ingredients">Product Ingredients</label>
        <input type="text" name= 'ingredients' id='ingredients' value={productData.ingredients.join(', ')} 
          onChange={(e)=>
            setFormData((prev)=>(
                {
                   ...prev,
                    ingredients : e.target.value.split(',').map(i=>i.trim())
                }
            )) } />
       
        <label htmlFor="isBestseller">
        <input type="checkbox" name= 'isBestseller' id='isBestseller' checked={productData.isBestseller} onChange={handleChange} />
        Best Seller
        </label>
        <label htmlFor="isNewArrival">
        <input type="checkbox" name='isNewArrival' id='isNewArrival' checked={productData.isNewArrival} onChange={handleChange} />
        New Arrival
        </label>

         </div>
        {/* <p>{new Date(product.createdAt).toLocaleDateString()}</p> */}
       <button className='saveBtn' type='submit'>Save Changes</button>
    </form>
    </div>
  )
}
