import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotalPrice } from '../utils/cartSlice';
import CartItem from './CartItem';
import './Cart.css';


const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const navigate = useNavigate();


  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleCheckout}
            className="checkout-btn"
          >
            Proceed to Checkout
          </button>
          <button 
            onClick={() => navigate('/')}
            className="continue-shopping-btn-secondary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;