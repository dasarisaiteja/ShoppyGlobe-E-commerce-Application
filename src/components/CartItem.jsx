import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../utils/cartSlice';
import './CartItem.css';

function CartItem(props) {
  const dispatch = useDispatch();
  const myItem = props.item;

  // Function to increase quantity
  function plusOne() {
    const newNumber = myItem.quantity + 1;
    dispatch(updateQuantity({ id: myItem.id, quantity: newNumber }));
  }

  // Function to decrease quantity (preventing going below 1)
  function minusOne() {
    if (myItem.quantity > 1) {
      const newNumber = myItem.quantity - 1;
      dispatch(updateQuantity({ id: myItem.id, quantity: newNumber }));
    }
  }

  // Function to remove item from cart
  function deleteItem() {
    dispatch(removeFromCart(myItem.id));
  }

  // Calculate the subtotal for this specific item
  const itemTotalPrice = myItem.price * myItem.quantity;

  return (
    <div className="cart-item">
      {/* Product Image */}
      <img 
        src={myItem.thumbnail} 
        alt={myItem.title}
        className="cart-item-image"
      />
      
      {/* Product Details */}
      <div className="cart-item-details">
        <h3>{myItem.title}</h3>
        <p className="cart-item-price">Price: ${myItem.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="cart-item-quantity">
        <button 
          onClick={minusOne} 
          className="quantity-btn"
          disabled={myItem.quantity <= 1}
        >
          -
        </button>
        
        <span className="quantity-display">
          {myItem.quantity}
        </span>
        
        <button onClick={plusOne} className="quantity-btn">
          +
        </button>
      </div>

      {/* Pricing and Actions */}
      <div className="cart-item-total">
        <p className="item-total">
          Total: ${itemTotalPrice.toFixed(2)}
        </p>
        
        <button onClick={deleteItem} className="remove-btn">
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;