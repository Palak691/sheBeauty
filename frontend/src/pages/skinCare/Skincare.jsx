import React, { useEffect, useRef, useState } from 'react'
import './Skincare.css'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../config/redux/action/productAction';
import skinCare from '../../assets/new/skin.webp'
import { ProductCard } from '../../components/productCard/ProductCard';
import { Filter } from '../../components/filter/Filter';
import { useSearchParams } from 'react-router-dom';

export const Skincare = () => {
  const {products, isLoading,hasMore,nextCursor} = useSelector((state)=>state.product);
  const dispatch = useDispatch();
  const productsRef = useRef(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    category : 'skincare',
   
  })
  useEffect(()=>{
    const fetchSkinProducts = async ()=>{
     await dispatch(getAllProducts({
      cursor : null,
      search : search,
      limit : 21,
      category : "skincare"
    }))
    }
    fetchSkinProducts();
  },[dispatch,search]);

  async function handleApplyFilter(filter){
    const newFilter = {
         category : "skincare",
         ...(filter.minPrice !== "" && {minPrice : filter.minPrice}),
         ...(filter.maxPrice !== "" && {maxPrice : filter.maxPrice}),
         ...(filter.skinType !== "" && { skinType: filter.skinType }),
        }
    setFilters(newFilter)
      await dispatch(getAllProducts({
        search : search,
        cursor : null,
        ...newFilter,
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
        })); 
     
        
      }
  return (
     <div className='skinCare'>
          {showFilter ? <Filter handleApplyFilter = {handleApplyFilter} showCategory = {false} onClose={() => setShowFilter(false)}/> :
          <div className='skinImg' onClick={()=>setShowFilter(!showFilter)}> 
            <img src={skinCare} alt='skin_Img' />
            <button>Set Filter</button>
          </div>}
           {(!isLoading && products.length === 0) ? 
                       <p>No products found...</p> : 
          <div className='skinCareProducts' ref={productsRef}>
            <p className='productHeading'>Top Skin Products</p>
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
