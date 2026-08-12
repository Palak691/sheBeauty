import React, { useEffect, useState } from 'react'
import './AddProducts.css'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, getAllProducts } from '../../../config/redux/action/productAction';
import { BackButton } from '../../../components/backbutton/BackButton';
export const AddProducts = () => {
    const {product} = useSelector((state)=>state.product);
    const {token} = useSelector((state)=>state.auth);
     
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
   
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

 

function handleChange(e){
    const {name , value, type, checked } = e.target;
    setProductData((prev)=>({
        ...prev,
        [name] : type === 'checkbox' ? checked : value
    }));
}

async function handleSubmit(e){
 e.preventDefault();
 if(!image){
  alert("Please select Product Img");
  return;
 }
  const payload = new FormData();
  payload.append('name', productData.name);
  payload.append("slug", productData.slug);
  payload.append("description", productData.description);
  payload.append("category", productData.category);
  payload.append("subCategory", productData.subCategory);
  payload.append("price", productData.price);
  payload.append("discountPercentage", productData.discountPercentage);
  payload.append("stock", productData.stock);
  payload.append("isBestseller", productData.isBestseller);
  payload.append("isNewArrival", productData.isNewArrival);
  
  //arrays need special handling

  productData.ingredients.forEach(ing=> payload.append('ingredients[]', ing));
  payload.append('product_image', image);//file obj

  const result = await dispatch(addProduct({token,payload}));
  if(addProduct.fulfilled.match(result)){
    setProductData({
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
    })
  }

}
  return (
    <div className='addProduct'>
      <BackButton/>
        <form  onSubmit={handleSubmit}>
      <h2>Create New Product</h2>
        <div className="productImage">
          <input type="file" accept='image/*' name='product_image' onChange={(e)=> setImage(e.target.files[0])} />
        </div>
    <div>
        <label htmlFor="name">Product Name</label>
        <input type="text" name='name' id='name' value={productData.name} onChange={handleChange} required />
        <label htmlFor="slug">Product Slug</label>
        <input type="text" name='slug' id='slug' value={productData.slug} onChange={handleChange} required />
        <label htmlFor="description">Product Description</label>
        <textarea type="text" name='description' id='description' value={productData.description} required onChange={handleChange} />
    </div>
    <div className="productPricing">
        <label htmlFor="price">Product Price</label>
        <input type="number" name='price' value={productData.price} onChange={handleChange} required />
        <label htmlFor="discountPercentage">Product Discount</label>
        <input type="text" name='discountPercentage' id='discountPercentage' required value={productData.discountPercentage} onChange={handleChange} />
        <label htmlFor="stock">Stocks</label>
        <input type="number" name='stock' id='stock' value={productData.stock} required onChange={handleChange}/>
    </div>
       <div className='productCategory'>
        <label htmlFor="category">Product Category</label>
        <select name="category" id='category' value={productData.category} required onChange={handleChange}>
          <option value="skincare">Skincare</option>
          <option value="haircare">Haircare</option>
          <option value="makeup">Makeup</option>
          <option value="tools">Tools</option>
        </select>
        <label htmlFor="subCategory">Product SubCategory</label>
        <input type="text" name='subCategory' id='subCategory' value={productData.subCategory} required  onChange={handleChange}/>
        </div>  
         <div className="productDetails">
        <label htmlFor="ingredients">Product Ingredients</label>
        <input type="text" name= 'ingredients' id='ingredients' required value={productData.ingredients.join(', ')} 
          onChange={(e)=>
            setProductData((prev)=>(
                {  ...prev,
                    ingredients : e.target.value.split(',').map(i=>i.trim())
                }
            )) } />
       
        <label htmlFor="isBestseller">
        <input type="checkbox" name= 'isBestseller' id='isBestseller' checked={productData.isBestseller} onChange={handleChange} />
        Best Seller
        </label>
        <label htmlFor="isNewArrival">
        <input type="checkbox" name='isNewArrival'  id='isNewArrival' checked={productData.isNewArrival} onChange={handleChange} />
        New Arrival
        </label>

         </div>
       <button className='saveBtn' type='submit'>Add New Product</button>
    </form>
    </div>
  )
}
