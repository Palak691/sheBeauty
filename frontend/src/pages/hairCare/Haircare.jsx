import React, { useEffect, useRef, useState } from 'react'
import './Haircare.css'
import hairCare from '../../assets/new/img3.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../config/redux/action/productAction'
import { ProductCard } from '../../components/productCard/ProductCard'
import { Filter } from '../../components/filter/Filter'
import { useSearchParams } from 'react-router-dom'

export const Haircare = () => {
  const {products, isLoading,nextCursor, hasMore} = useSelector((state)=>state.product);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const productsRef = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    category : 'haircare'
  });

  useEffect(()=>{
    const fetchHairProducts = async ()=>{
     await dispatch(getAllProducts({
       cursor : null,
       category : "haircare",
       search : search,
       limit : 21,
    }))
    }
    fetchHairProducts();
  },[dispatch, search]);
  async function handleApplyFilter(filter){
    const newFilter = {
      category : "haircare",
       ...(filter.skinType !=='' && { skinType: filter.skinType }),
      ...(filter.minPrice !== '' && {minPrice : filter.minPrice}),
      ...(filter.maxPrice !== '' && {maxPrice : filter.maxPrice})
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
        ...filters,
       limit: 10,
       
     }))
     
   }
 
  return (
    <div className='hairCare'>
      {showFilter ? <Filter handleApplyFilter={handleApplyFilter} showCategory={false} onClose={()=>setShowFilter(false)} />  :
      <div className='hairImg' onClick={()=>setShowFilter(!showFilter)}>        
        <img src={hairCare} alt='hair_Img' />
        <button>Set Filter</button>
      </div>}
       {(!isLoading && products.length === 0) ? 
                       <p>No products found...</p> : 
      <div className='hairCareProducts' ref={productsRef}>
        <p className='productHeading'>Top Hair Products</p>
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
