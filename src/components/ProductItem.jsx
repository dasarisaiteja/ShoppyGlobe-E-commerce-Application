import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../utils/cartSlice';
import './ProductItem.css';

function ProductItem(props) {
  // We extract the product from props
  const product = props.product;
  
  const dispatch = useDispatch();

  const [isImageReady, setIsImageReady] = useState(false);

  // when the user clicks the blue button
  function handleButtonClick() {
    // We send the whole product object to our cart
    dispatch(addToCart(product));
    alert("Item added to your cart!"); 
  }

  function finishLoading() {
    setIsImageReady(true);
  }

  return (
    <div className="single-card">
      <Link to={"/product/" + product.id} className="card-link">
        
        <div className="image-box">
          {isImageReady === false && <p>Loading image...</p>}
          
          <img 
            src={product.thumbnail} 
            alt="product"
            onLoad={finishLoading}
            style={{ display: isImageReady ? "block" : "none" }}
            width="200" 
          />
        </div>

        <h3 className="item-name">{product.title}</h3>
        <p className="item-price">Price: ${product.price}</p>
        
        <div className="item-rating">
          Rating: {product.rating} / 5
        </div>
      </Link>

      <button 
        className="add-button"
        onClick={handleButtonClick}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductItem;