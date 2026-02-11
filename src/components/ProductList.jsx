import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, selectSearchQuery } from '../utils/searchSlice';
import useProducts from '../utils/useProducts';
import ProductItem from './ProductItem';

function ProductList() {
  // We get our products, loading status, and errors from our custom hook
  const { products, loading, error } = useProducts();
  
  // We get the search text from Redux search slice
  const searchQuery = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  // every time someone types in the search box
  function handleSearchChange(event) {
    // We send the new text to our Redux store
    dispatch(setSearchQuery(event.target.value));
  }

  const filteredProducts = products.filter(function(item) {
    const lowerSearch = searchQuery.toLowerCase();
    const titleMatch = item.title.toLowerCase().includes(lowerSearch);
    const descMatch = item.description.toLowerCase().includes(lowerSearch);
    const categoryMatch = item.category.toLowerCase().includes(lowerSearch);

    return titleMatch || descMatch || categoryMatch;
  });

  // 1. if the page is still loading
  if (loading === true) {
    return (
      <div className="list-page">
        <p>Please wait, we are fetching the items...</p>
      </div>
    );
  }

  // 2. if there was an error
  if (error) {
    return (
      <div className="list-page">
        <h2>Something went wrong!</h2>
        <p>{error}</p>
      </div>
    );
  }

  // 3. If everything is okay, show the search bar and the products
  return (
    <div className="product-list-page">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search for items here..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="my-search-input"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-data">
          <h3>Sorry, we couldn't find that item.</h3>
        </div>
      ) : (
        <div>
          <h2 className="title-text">Our Products ({filteredProducts.length})</h2>
          
          <div className="product-grid-layout">
            {filteredProducts.map(function(singleProduct) {
              return (
                <ProductItem 
                  key={singleProduct.id} 
                  product={singleProduct} 
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;