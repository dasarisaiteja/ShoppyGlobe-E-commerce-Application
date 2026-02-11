import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../utils/cartSlice';
import './ProductDetails.css';

function ProductDetail() {
  const params = useParams();
  const productId = params.id;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // State for holding our single product data
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // This runs as soon as the page opens
  useEffect(function() {
    fetch("https://dummyjson.com/products/" + productId)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setItem(data);
        setIsLoading(false);
      })
      .catch(function(err) {
        setErrorMessage("Could not find product details.");
        setIsLoading(false);
      });
  }, [productId]); 

  // Function to add item to cart
  function addItemToCart() {
    dispatch(addToCart(item));
    alert("This product was added to your cart!");
  }

  // Function to go back to the home page
  function goBackHome() {
    navigate("/");
  }

  // 1. Show message while loading
  if (isLoading === true) {
    return (
      <div className="details-page">
        <h1>Loading...</h1>
        <p>Please wait while we get the information.</p>
      </div>
    );
  }

  // 2. Show message if there is an error
  if (errorMessage !== "") {
    return (
      <div className="details-page">
        <h2>Oh no!</h2>
        <p>{errorMessage}</p>
        <button onClick={goBackHome}>Go Back to Shop</button>
      </div>
    );
  }

  // 3. Show the actual product details
  return (
    <div className="product-details-screen">
      <button onClick={goBackHome} className="back-btn">
        Go Back
      </button>

      <div className="details-box">
        <div className="image-part">
          <img 
            src={item.thumbnail} 
            alt="product" 
            style={{ width: "300px" }} 
          />
        </div>

        <div className="info-part">
          <h1>{item.title}</h1>
          <p><b>Category:</b> {item.category}</p>
          <p><b>Brand:</b> {item.brand}</p>
          <p><b>Rating:</b> {item.rating} stars</p>
          
          <h2 style={{ color: "green" }}>Price: ${item.price}</h2>
          
          <p className="description-text">
            {item.description}
          </p>

          <p>Items left in shop: {item.stock}</p>

          <button 
            className="big-add-btn"
            onClick={addItemToCart}
          >
            Add to My Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;