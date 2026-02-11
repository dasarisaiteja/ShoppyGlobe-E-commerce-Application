import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  // Function to take the user back to the home page
  function handleGoHome() {
    navigate("/");
  }

  // Function to go back one step in history
  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div className="error-page-container">
      <div className="error-box">
        <h1 style={{ fontSize: "50px", color: "red" }}>404 Error</h1>
        <h2>Oops! We can't find that page.</h2>
        
        <p className="description">
          It looks like the link you clicked is broken or the page was moved to a new shop.
        </p>

        <div className="button-row">
          <button 
            onClick={handleGoHome}
            className="home-button"
          >
            Go back to ShoppyGlobe Home
          </button>

          <button 
            onClick={handleGoBack}
            className="back-button"
          >
            Go Back to previous page
          </button>
        </div>

        <div className="icon-area">
          <span style={{ fontSize: "100px" }}>🤔</span>
          <p>Are you lost?</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;