import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getAllProducts } from '../../../config/redux/action/productAction';
import './AllProducts.css'
import { useNavigate } from 'react-router-dom';

export const AllProducts = () => {
    const { products } = useSelector((state) => state.product);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const nav = useNavigate();
    useEffect(() => {
        dispatch(getAllProducts({
            token,
            cursor: null,
            limit: 20
        }));
    }, [dispatch]);

    async function handleDelete(id) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;
        const result = await dispatch(deleteProduct({token,id}));


        if (deleteProduct.fulfilled.match(result)) {

            await dispatch(getAllProducts({
                token,
                cursor: null,
                limit: 20
            }))
        }

    }

    return (
        <>
            <div className="productsHeader">
                <h2>Products</h2>

                <button
                    className="addProductBtn"
                    onClick={() => nav("/admin/products/new")}
                >
                    + Add Product
                </button>
            </div>
            <div className="allProducts">

                <div className="tableHeading">
                    <p>Image</p>
                    <p>Name</p>
                    <p>Price</p>
                    <p>category</p>
                    <p>Stock</p>
                    <p>Ratings</p>
                    <p>Bestsellers</p>
                    <p>NewArrivals</p>
                    <p>CreatedAt</p>
                </div>

                {products.map((product) => (
                    <div className="tableRow" key={product._id}>

                        <img
                            src={product.images}
                            alt={product.name} />
                        <p>{product.name}</p>

                        <p>₹{product.price}</p>
                        <p>{product.category}</p>
                        <p className={product.stock === 0 ? "outOfStock" : ""}>
                            {product.stock}
                        </p>
                        <p>{product.ratingAvg ?? 0} ⭐</p>
                        <p>{product.isBestseller ?
                            <svg color='green' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg> : <svg color='red' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        }</p>
                        <p>{product.isNewArrival ?
                            <svg color='green' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>
                            : <svg color='red' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        }</p>
                        <p>{new Date(product.createdAt).toLocaleDateString()}</p>

                        <div className="actions">
                            <button className='editBtn' onClick={() => { nav(`/admin/products/${product._id}/edit`) }}>
                                Edit</button>
                            <button className='deleteBtn' onClick={() => handleDelete(product._id)}>Delete</button>
                        </div>

                    </div>
                ))}

            </div>
        </>
    )
}
