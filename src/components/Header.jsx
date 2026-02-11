import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartTotal } from '../utils/cartSlice';
import "./Header.css"

function Header() {
  // We call our selector to get the total number of items
  const cartTotal = useSelector(selectCartTotal);

  function showCartBadge() {
    if (cartTotal > 0) {
      return <span className="cart-badge">{cartTotal}</span>;
    }
    // If cart is empty, return nothing
    return null;
  }

  return (
    <header className="my-header-bar">
      <div className="header-container">
        
        <Link to="/" className="my-logo">
          <h1>🛒 ShoppyGlobe</h1>
        </Link>
        
        <nav className="navigation-menu">
          <Link to="/" className="nav-item">Home</Link>
          
          <Link to="/cart" className="nav-item cart-button">
            Shopping Cart
            {showCartBadge()}
          </Link>
        </nav>

      </div>
    </header>
  );
}

export default Header;