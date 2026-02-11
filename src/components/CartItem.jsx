import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../utils/cartSlice';

// Using props as the parameter so we can see where the data comes from
function CartItem(props) {
  const dispatch = useDispatch();
  
  // Making a simple variable for our item
  const myItem = props.item;

  function plusOne() {
    const newNumber = myItem.quantity + 1;
    dispatch(updateQuantity({ id: myItem.id, quantity: newNumber }));
  }

  function minusOne() {
    if (myItem.quantity > 1) {
      const newNumber = myItem.quantity - 1;
      dispatch(updateQuantity({ id: myItem.id, quantity: newNumber }));
    } else {
      alert("You must have at least 1 item in the cart!");
    }
  }

  //  This function removes the item completely
  function deleteItem() {
    dispatch(removeFromCart(myItem.id));
  }

  // Calculate the subtotal for this specific item
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