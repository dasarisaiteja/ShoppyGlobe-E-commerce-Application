import { useDispatch } from 'react-redux';
// We need these to change our Redux state
import { removeFromCart, updateQuantity } from '../utils/cartSlice';
import './CartItem.css';

// Using props as the parameter so we can see where the data comes from
function CartItem(props) {
  const dispatch = useDispatch();
  
  // Making a simple variable for our item
  const myItem = props.item;

  // 1. This function adds 1 to the current quantity
  function plusOne() {
    const newNumber = myItem.quantity + 1;
    // We send the ID and the new quantity to Redux
    dispatch(updateQuantity({ id: myItem.id, quantity: newNumber }));
  }

  // 2. This function subtracts 1 but stops at 1
  function minusOne() {
    if (myItem.quantity > 1) {
      const newNumber = myItem.quantity - 1;
      dispatch(updateQuantity({ id: myItem.id, quantity: newNumber }));
    } else {
      alert("You must have at least 1 item in the cart!");
    }
  }

  // 3. This function removes the item completely
  function deleteItem() {
    // We only need the ID to find which one to remove
    dispatch(removeFromCart(myItem.id));
  }

  // Calculate the subtotal for this specific item
  // Beginners like to do the math here rather than inside the HTML tags
  const itemTotalPrice = myItem.price * myItem.quantity;

  return (
    <div className="cart-row">
      {/* Product Image */}
      <img 
        src={myItem.thumbnail} 
        alt="cart-product"
        className="row-img"
        style={{ width: "80px" }}
      />
      
      <div className="row-info">
        <h3>{myItem.title}</h3>
        <p>Price: ${myItem.price}</p>
      </div>

      <div className="quantity-controls">
        {/* Decrease Button */}
        <button onClick={minusOne} className="minus-btn">
          -
        </button>
        
        <span className="number-box">
          {myItem.quantity}
        </span>
        
        {/* Increase Button */}
        <button onClick={plusOne} className="plus-btn">
          +
        </button>
      </div>

      <div className="row-final-price">
        <p><b>Total: ${itemTotalPrice}</b></p>
        
        <button onClick={deleteItem} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default CartItem;