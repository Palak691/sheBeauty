import React, { useEffect, useRef, useState } from 'react'
import makeup from '../../assets/new/eye.avif'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../config/redux/action/productAction';
import { ProductCard } from '../../components/productCard/ProductCard';
import './Makeup.css'
import { Filter } from '../../components/filter/Filter';
import { useSearchParams } from 'react-router-dom';

export const Makeup = () => {
   const {products, isLoading, hasMore, nextCursor} = useSelector((state)=>state.product);
  const dispatch = useDispatch();
  const productsRef = useRef(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [showFilter, setShowFilter] = useState(false);
  const [filters , setFilters] = useState({
    category : "makeup",
    
  });

  useEffect(()=>{
    const fetchMakeupProducts = async ()=>{
     await dispatch(getAllProducts({
      category : "makeup",
      cursor : null,
      search : search,
      limit : 21,
    }))
    }
    fetchMakeupProducts();
  },[dispatch, search]);
  async function handleApplyFilter(filter){
    const newFilter = {
      category : 'makeup',
       ...(filter.minPrice !== "" && {minPrice : filter.minPrice}),
         ...(filter.maxPrice !== "" && {maxPrice : filter.maxPrice}),
           ...(filter.skinType !== '' && { skinType: filter.skinType }),
    }
    setFilters(newFilter);

    await dispatch(getAllProducts({
      search : search,
      cursor : null,
      category : "makeup",
     ...newFilter ,
      limit : 10
    }))
    setShowFilter(false);
  }
  async function handleLoadMore(){
 
    await dispatch(getAllProducts({
      search : search,
      cursor : nextCursor,
      ...filters,
      limit: 10,
    }))
   
  }
  return (
      <div className='makeup'>
        {showFilter? <Filter handleApplyFilter= {handleApplyFilter} onClose={()=>setShowFilter(false)} showCategory={false} /> : 
              <div className='makeupImg' onClick={()=>setShowFilter(true)}>
                <img src={makeup} alt='makeup_Img' />
                <button>Set Filter</button>
              </div>}
               {(!isLoading && products.length === 0) ? 
                       <p>No products found...</p> : 
              <div className='makeupProducts' ref={productsRef}>
                <p className='productHeading'>Top Makeup Products</p>
               <div className='productGrid'>
                     {products.map((product)=>(
                      <ProductCard key={product._id} product={product}/>
                     ))}
                   </div>
          {hasMore && (<button
          className="loadMoreBtn"
          onClick={handleLoadMore} disabled = {isLoading}> Load More</button>)}
              </div>
}
            </div>
  )
}
