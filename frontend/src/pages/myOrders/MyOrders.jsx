import React, { useEffect, useState } from 'react'
import './MyOrders.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { generateInvoice, getMyOrders } from '../../config/redux/action/orderAction';
import { BackButton } from '../../components/backbutton/BackButton';
import { Account } from '../../components/common/Account';
import img from '../../assets/extras/img5.jpg'


export const MyOrders = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { orders, isLoading } = useSelector((state) => state.order);
  const [showAccount, setShowAccount] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getMyOrders(token));
    }
  }, [dispatch, token]);

  if (isLoading) {
    return <h2 className="loading">Loading Order...</h2>;
  }

  if (!orders.items?.length) {
    return (
      <section className="emptyOrders">
        <h2>No Orders Yet</h2>
        <p>Your placed orders will appear here.</p>
      </section>
    );
  }

async function handleDownloadInvoice(orderId) {
  const result = await dispatch(
    generateInvoice({
      token,
      orderId,
    })
  );

  console.log("4. Redux result:", result);

  if (generateInvoice.fulfilled.match(result)) {
    console.log("5. Invoice received");
    console.log("6. Payload:", result.payload);

    const blob = new Blob([result.payload], {
      type: "application/pdf",
    });

    console.log("7. Blob:", blob);

    const url = window.URL.createObjectURL(blob);

    console.log("8. URL created:", url);

    const link = document.createElement("a");

    link.href = url;
    link.download = `invoice-${orderId}.pdf`;

    document.body.appendChild(link);

    console.log("9. Clicking download");

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

    console.log("10. Done");
  } else {
    console.log("Invoice failed:", result);
  }
}
  return (
    <section className="ordersPage">
      <button className="accountToggle" onClick={() => setShowAccount(prev => !prev)}>
        {showAccount ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </button>

      {showAccount && (
        <div className="menuOverlay" onClick={() => setShowAccount(false)} />
      )}

      <div className={`accountMenu ${showAccount ? "show" : ""}`}>
        <Account />
      </div>

      <div className="ordersContent">
        {/* <BackButton /> */}
        <h1>My Orders</h1>
        {orders.items?.map((order) => (
          <div className="orderCard" key={order._id}>
            <div className="orderTop">
              <div>
                <h3>Order #{orders._id.slice(-6).toUpperCase()}</h3>
                <p>
                  {new Date(orders.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <span className="orderStatus">{orders.status}</span>
            </div>

            <div className="orderProducts">
              {orders?.items.map((item) => (
                <div className="orderProduct" key={item._id}>
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>
                    <p>
                      ₹{item.price.toLocaleString("en-IN")} × {item.quantity}
                    </p>
                  </div>
                  {orders.status === "delivered" ? 
                      <div className="reviewBtn">
                    <button onClick={()=>{
                       nav(`/product/${item.slug}#review`)
                    }}>Rate & Review</button>
                    </div> : ""
                 }
                </div>
              ))}
            </div>

            {order.gift && (
              <div className="giftSection">
                <h4>🎁 Free Gift</h4>
                <div className="giftCard">
                  <img src={order.gift.image} alt={order.gift.name} />
                  <p>{order.gift.name}</p>
                </div>

              </div>
            )}
            

            <div className="orderBottom">
              <div>
                <span>Payment</span>
                <strong>{orders.paymentMethod}</strong>
              </div>
              <div>
                <span>Total</span>
                <strong>₹{orders.totalPrice.toLocaleString("en-IN")}</strong>
              </div>
              
            </div>
            <button onClick={() => handleDownloadInvoice(orders._id)}>
  Download Invoice
</button>
            
          </div>
        ))}
        
      </div>

      <div className="womenImg">
        <img src={img} alt="women_img" />
      
      </div>
    </section>
  );
}