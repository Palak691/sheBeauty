import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllProducts } from '../../config/redux/action/productAction'
import './ProductListing.css'
import { ProductCard } from '../../components/productCard/ProductCard'
import mylogo from '../../assets/images/logo2.jpeg'
import { Filter } from '../../components/filter/Filter'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const ProductListing = () => {
  const {products, isLoading, nextCursor, hasMore} = useSelector((state)=>state.product);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [filters, setFilters] = useState({});
  const [showFilter, setShowFilter] = useState(true);
  
  useEffect(()=>{
    dispatch(getAllProducts({
      search : search,
      cursor : null,
      limit : 10,
    }))
  },[dispatch, search])


  async function handleApplyFilter(filter){
    
      const newFilter = {//to update load more with filter applied
           category : filter.category,
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
     dispatch(
      getAllProducts({
        search :search,
        cursor : nextCursor,
        ...filters,
        limit : 10,
        
      })
     )
  }
  return (
    <>
    
  <div className="homeContainer">
    <div className="Image">
      <div>
        <p className="smallText">Beauty Rewards Await You at</p>

        <div className="navLogo" onClick={()=>nav('/freeGift')}>
          <img src={mylogo} alt="SheBeauty" />
          <span className="span">sheBeauty</span>
        </div>
      </div>
    </div>
  </div>

  {/* Products + Filter */}
  <div className="listingContainer">
    <Filter handleApplyFilter={handleApplyFilter} showCategory={true} onClose={() => setShowFilter(false)} />
   {(!isLoading && products.length === 0) ? 
                       <p>No products found...</p> :
    <div className="productsSection">
      <div className="productGrid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
      {hasMore && (
        <button
          className="loadMoreBtn"
          onClick={handleLoadMore} disabled = {isLoading} >
          Load More
        </button>
      )}
    </div>
}
  </div>
    </>

  )
}
