import React, { useEffect, useState } from 'react'
import './EditOrder.css'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerOrderById, updateCustomerOrderStatus } from '../../../config/redux/action/orderAction';
import { BackButton } from '../../../components/backbutton/BackButton';

export const EditOrder = () => {
    const {token} = useSelector((state)=>state.auth);
    const { customerOrder ,isLoading } = useSelector((state) => state.order);
    const { id } = useParams();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCustomerOrderById({id, token}));

    }, [dispatch, id, token])

    const [status, setStatus] = useState('');
    useEffect(() => {
        if (customerOrder) {
            setStatus(customerOrder.status)
        }
    }, [customerOrder])

    async function handleUpdateStatus() {
       const result =  await dispatch(updateCustomerOrderStatus({
            id,
            status,
            token
        }));
        if(updateCustomerOrderStatus.fulfilled.match(result)){

            await dispatch(getCustomerOrderById({id,token}));
        }

    }
    return (
        <div className="editOrder">
            <BackButton />
            <h2>Order Details</h2>

    
            <section className="orderSection">
                <h3>Customer Information</h3>
                <div className="orderCard">
                    <p><strong>Name:</strong> {customerOrder?.userId?.name}</p>
                    <p><strong>Email:</strong> {customerOrder?.userId?.email}</p>
                </div>
            </section>

            {/* Shipping */}

            <section className="orderSection">
                <h3>Shipping Address</h3>
                <div className="orderCard">
                    <p>
                        <strong>Full Name:</strong>{" "}
                        {customerOrder?.shippingAddress?.fullName}
                    </p>
                    <p>
                        <strong>Address:</strong>{" "}
                        {customerOrder?.shippingAddress?.address}
                    </p>
                    <p>
                        <strong>City:</strong>{" "}
                        {customerOrder?.shippingAddress?.city}
                    </p>
                    <p>
                        <strong>Mobile:</strong>{" "}
                        {customerOrder?.shippingAddress?.mobile_no}
                    </p>
                </div>
            </section>


            <section className="orderSection">
                <h3>Ordered Products</h3>
                {
                    customerOrder?.items?.map((item) => (
                    <div  className="orderedProduct" key={item._id}>
                            <img src={item.image} alt={item.name}/>
                            <div className="productInfo">
                             <h4>{item.name}</h4>
                                <p>₹{item.price}</p>
                                <p>Quantity : {item.quantity}</p>
                                <p>Category : {item.product.category}</p>
                                <p>
                                    Discount : {" "}
                               {item.product.discountPercentage}%
                                </p>
                            </div>
                        </div>
                    ))
                }
            </section>


            <section className="orderSection">
                <h3>Payment Summary</h3>
                <div className="orderCard">
                    <p>
                        <strong>Item Price:</strong>
                        ₹{customerOrder?.itemPrice}
                    </p>
                    <p>
                        <strong>Shipping:</strong>
                        ₹{customerOrder?.shippingPrice}
                    </p>
                    <p>
                        <strong>Total:</strong>
                        ₹{customerOrder?.totalPrice}
                    </p>
                    <p>
                        <strong>Payment Method:</strong>
                        {customerOrder?.paymentMethod}
                    </p>
                    <p>
                        <strong>Payment:</strong>
                        {customerOrder?.isPaid ? "Paid" : "Unpaid"}
                    </p>
                </div>
            </section>

            <section className="orderSection">
                <h3>Order Status</h3>
                <div className="orderCard">
                    <select value={status} required onChange={(e) => setStatus(e.target.value)} >
                        <option value="pending">Pending</option>
                        <option value="processing">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button className="saveBtn" onClick={handleUpdateStatus} disabled={isLoading}>
                       {isLoading ? "Updating.." : "Update Status"} 
                    </button>

                </div>

            </section>

        </div>
    )
}
