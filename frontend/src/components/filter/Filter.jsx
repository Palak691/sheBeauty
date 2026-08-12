import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../config/redux/action/productAction';
import './Filter.css'

export const Filter = ({handleApplyFilter, showCategory, onClose}) => {
   const dispatch = useDispatch();

   const categories = ["skincare","makeup","haircare","body","fragrance","tools"];
   const skinTypes = ["dry", "oily", "combination", "sensitive", "normal",];
   const [selectedCategory, setSelectedCategory] = useState('');
   const [selectedSkinType, setSelectedSkinType] = useState('');
   const [minPrice, setMinPrice] = useState('');
   const [maxPrice, setMaxPrice] = useState('');

   
   function handleClearFilter() {
    setSelectedCategory("");
    setSelectedSkinType("");
    setMinPrice("");
    setMaxPrice("");

    handleApplyFilter({
      cursor :"",
      skinType : "",
      minPrice : "",
      maxPrice : ""

    })
    if (onClose) onClose();
}

  return (
    <div className='filterContainer'>
        <button className="closeBtn" onClick={onClose}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
   </svg>
        </button>
        <div className='setFilter'>
        <h2>Filters</h2>
       <button className='clearBtn' onClick={handleClearFilter}>Clear Filter</button>

        </div>
        <div className='allcategory'>
       {showCategory &&
       <>
        <h3>Categories</h3>
        {categories.map((category)=>(
                <div key={category}>
                 <input type= "radio" id={category} name='category' value={category}
                 checked={category === selectedCategory} onChange={(e)=> setSelectedCategory(e.target.value)} />
                 <label htmlFor={category}>{category.toUpperCase()}</label>
                </div>
        ))}
        </>
       }
       </div>
       <div className='skinType'>
        <h3>SkinTypes</h3>
       {skinTypes.map((skinType)=>{
        return(
            <div key={skinType}>
                 <input type= "radio" id={skinType} name='skinType' value={skinType} 
                 checked = {skinType === selectedSkinType}
                 onChange={(e)=>setSelectedSkinType(e.target.value)}/>
                 <label htmlFor={skinType}>{skinType.charAt(0).toUpperCase() +  skinType.slice(1)}</label>
            </div>
        )
       })}
       </div>
       <div className="InputPrice">
        <label htmlFor="minPrice">Min Price</label>
        <input type="number" id='minPrice'  min={100} value={minPrice} placeholder='100'
        onChange={(e)=>setMinPrice(e.target.value)}/>
       </div>
        <div className="InputPrice">
        <label htmlFor="maxPrice">Max Price</label>
        <input type="number" id='maxPrice' value={maxPrice}  placeholder='10000'
        onChange={(e)=> setMaxPrice(e.target.value)}/>
       </div>
       <button className='applyBtn' onClick={()=>
        handleApplyFilter({
        category: selectedCategory,
        skinType: selectedSkinType,
        minPrice,
        maxPrice,
        })
        }  
        >Apply Filter</button>
    </div>
  )
}
