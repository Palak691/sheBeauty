import React, { useEffect, useRef, useState } from 'react'
import './Tools.css'
import skinTools from '../../assets/new/tools.avif'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../config/redux/action/productAction';
import { ProductCard } from '../../components/productCard/ProductCard';
import { Filter } from '../../components/filter/Filter';
import { useSearchParams } from 'react-router-dom';

export const Tools = () => {
  const {products, isLoading,nextCursor,hasMore} = useSelector((state)=>state.product);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [filters, setFilters] = useState({//to update load more with applied filter
    category : "tools",
   
  });
  const productsRef = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  useEffect(()=>{
    const fetchSkinProducts = async ()=>{
     await dispatch(getAllProducts({
      search : search,
      cursor : null,
      limit : 20,
      category : "tools"
    }))
   }
    fetchSkinProducts();
  },[dispatch,search]);
   
  async function handleApplyFilter(filter){
  
    const newFilter = {//to update load more with filter applied
      category : "tools",
      ...(filter.minPrice !==  "" && {minPrice : filter.minPrice}),
      ...(filter.maxPrice !== "" && {maxPrice : filter.maxPrice}),
      ...(filter.skinType !== "" && { skinType: filter.skinType }),
      
    }
    setFilters(newFilter);
  
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
            ...filters, // reads whatever was last set by setFilters
            limit: 10,
                     
          }))
  
        }
  return (
    <div className='skinTools'>
        {showFilter ? <Filter handleApplyFilter = {handleApplyFilter} showCategory = {false} onClose={() => setShowFilter(false)}/> :
              <div className='skinToolsImg' onClick={()=>setShowFilter(true)}>
                <img src={skinTools} alt='skinTools_Img' />
                <button>Set Filter</button>
              </div>
              }
                   {(!isLoading && products.length === 0) ? 
                       <p>No products found...</p> : 
                       <div className='skinToolsProducts' ref={productsRef}>
                       <p className='productHeading'>Top Skin Tools Products</p>
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
