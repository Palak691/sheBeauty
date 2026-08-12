import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../config/redux/action/productAction';

export const LoadMore = () => {
  const {products, isLoading, nextCursor, hasMore} = useSelector((state)=>state.product);
  const dispatch = useDispatch();

    async function handleLoadMore(){
       dispatch(
        getAllProducts({
          cursor : nextCursor,
          search : "",
          limit : 10,
          
        })
       )
    }
  return (
    <div>
      {hasMore && (
        <button onClick={handleLoadMore}>
          Load More</button>
      )}
      {isLoading ? "Loading..." :"Load More"}
    </div>
  )
}
