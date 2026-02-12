import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import './App.css';

function App() {
  
  const loadingScreen = (
    <div className="loading-screen">
      <h2>Please wait...</h2>
      <p>Our shop is loading!</p>
    </div>
  );

  return (
    <div className="shoppyglobe-app">
      <Header />

      <main className="content-area">
        <Suspense fallback={loadingScreen}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="my-footer">
        <p>Copyright 2024 - ShoppyGlobe E-commerce Project</p>
      </footer>
    </div>
  );
}

export default App;