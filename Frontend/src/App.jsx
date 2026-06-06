import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <BrowserRouter>
      {/* Top Bar */}
      <div style={{ background: '#003366', padding: '8px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>🚚 Free delivery on orders above ₹499</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {!user ? (
            <>
              <a href="/login" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '13px' }}>Login</a>
              <a href="/register" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '13px' }}>Register</a>
            </>
          ) : (
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>👋 Hello, {user.name}</span>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <nav style={{ background: 'white', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '32px' }}>🛒</span>
          <div>
            <div style={{ color: '#003366', fontWeight: '800', fontSize: '24px', lineHeight: 1 }}>ShopEZ</div>
            <div style={{ color: '#ff6600', fontSize: '11px', fontWeight: '600' }}>BEST DEALS EVERY DAY</div>
          </div>
        </a>

        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="/" style={{ color: '#333', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>🏠 Home</a>
          <a href="/cart" style={{ color: '#333', textDecoration: 'none', fontSize: '15px', fontWeight: '500', position: 'relative' }}>
            🛒 Cart
          </a>
          {user ? (
            <>
              <a href="/profile" style={{ color: '#333', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>👤 Profile</a>
              {user.isAdmin && (
                <a href="/admin" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', background: '#ff6600', padding: '8px 16px', borderRadius: '6px', fontWeight: '600' }}>⚙️ Admin</a>
              )}
            </>
          ) : (
            <a href="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', background: '#003366', padding: '8px 20px', borderRadius: '6px', fontWeight: '600' }}>Login / Register</a>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
