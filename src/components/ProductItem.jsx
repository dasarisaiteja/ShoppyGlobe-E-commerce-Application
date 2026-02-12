import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../utils/cartSlice";
import PropTypes from "prop-types";
import "./ProductItem.css";

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  return (
    <div className="single-card">
      <Link to={`/product/${product.id}`} className="card-link">
        <div className="image-box">
          {!isImageLoaded && <div className="image-skeleton"></div>}

          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            onLoad={() => setIsImageLoaded(true)}
            className={isImageLoaded ? "product-image show" : "product-image hide"}
          />
        </div>

        <h3 className="item-name">{product.title}</h3>
        <p className="item-price">Price: ${product.price}</p>
        <div className="item-rating">
          ⭐ Rating: {product.rating} / 5
        </div>
      </Link>

      <button className="add-button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    brand: PropTypes.string,
    stock: PropTypes.number,
  }).isRequired,
};

export default ProductItem;
