import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotalPrice, clearCart } from '../utils/cartSlice';
import "./CheckOut.css"

function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  
  // State to show the success message
  const [isOrderDone, setIsOrderDone] = useState(false);

  // This function runs when the user clicks "Place Order"
  function handleFormSubmit(event) {
    // This stops the page from refreshing
    event.preventDefault();
    
    // 1. Show the success message on the screen
    setIsOrderDone(true);
    
    // 2. Tell Redux to empty our cart
    dispatch(clearCart());
    
    // 3. Wait for 3 seconds, then go back to the Home page
    setTimeout(function() {
      navigate('/');
    }, 3000);
  }

  if (isOrderDone === true) {
    return (
      <div className="checkout-page">
        <div className="success-box">
          <h1>Order placed!</h1>
          <p>Thank you for buying from ShoppyGlobe.</p>
          <p>We are taking you back to the home page now...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h2>Finish Your Purchase</h2>
      
      <div className="checkout-layout">
        
        <form onSubmit={handleFormSubmit} className="my-form">
          <h3>Your Details</h3>
          
          <label>Full Name:</label>
          <input
            type="text"
            required
            value={userName}
            onChange={function(e) { setUserName(e.target.value) }}
            placeholder="Enter your name"
          />

          <label>Email Address:</label>
          <input
            type="email"
            required
            value={userEmail}
            onChange={function(e) { setUserEmail(e.target.value) }}
            placeholder="Enter your email"
          />

          <label>Shipping Address:</label>
          <textarea
            required
            value={userAddress}
            onChange={function(e) { setUserAddress(e.target.value) }}
            placeholder="Enter your full address"
          />

          <h3>Payment</h3>
          <label>Credit Card Number:</label>
          <input
            type="text"
            required
            value={cardNumber}
            onChange={function(e) { setCardNumber(e.target.value) }}
            placeholder="1234 5678 9012 3456"
          />

          <button type="submit" className="buy-button">
            Place Order
          </button>
        </form>

        <div className="order-list-sidebar">
          <h3>Items You Are Buying</h3>
          {cartItems.map(function(item) {
            return (
              <div key={item.id} className="small-item-row">
                <p>{item.title} (x{item.quantity})</p>
                <p><b>${item.price * item.quantity}</b></p>
              </div>
            );
          })}
          <hr />
          <h4>Total to Pay: ${totalPrice}</h4>
        </div>

      </div>
    </div>
  );
}

export default Checkout;