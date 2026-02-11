import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../utils/cartSlice';
import './ProductItem.css';

function ProductItem(props) {
  const product = props.product;
  const dispatch = useDispatch();
  const [isImageReady, setIsImageReady] = useState(false);

  function handleButtonClick() {
    
    dispatch(addToCart(product));
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
            alt={product.title}
            onLoad={finishLoading}
            style={{ display: isImageReady ? "block" : "none" }}
            width="200" 
          />
        </div>

        <h3 className="item-name">{product.title}</h3>
        <p className="item-price">Price: ${product.price}</p>
        
        <div className="item-rating">
          ⭐ Rating: {product.rating} / 5
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