import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    axios.get('/api/products').then(res => {
      setProducts(res.data);
      const cats = ['All', ...new Set(res.data.map(p => p.category))];
      setCategories(cats);
    });
  }, []);

  const addToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) { alert('Please login first!'); window.location.href = '/login'; return; }
    try {
      await axios.post('/api/cart', { productId, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Added to cart! 🛒');
    } catch (err) {
      alert('Failed to add to cart!');
    }
  };

  const filtered = products.filter(p =>
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>

      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #003366 0%, #0066cc 50%, #0099ff 100%)', padding: '80px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200") center/cover', opacity: 0.15 }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'white', fontSize: '52px', fontWeight: '800', margin: '0 0 10px', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>Shop Smart. Shop Easy.</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '20px', margin: '0 0 30px' }}>Discover amazing products at unbeatable prices!</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0' }}>
            <input
              placeholder="Search for products, brands and more..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '16px 24px', width: '500px', border: 'none', fontSize: '16px', outline: 'none', borderRadius: '30px 0 0 30px' }}
            />
            <button style={{ padding: '16px 28px', background: '#ff6600', color: 'white', border: 'none', borderRadius: '0 30px 30px 0', fontSize: '18px', cursor: 'pointer' }}>🔍</button>
          </div>
        </div>
      </div>

      {/* Offer Banners */}
      <div style={{ display: 'flex', gap: '15px', padding: '20px 40px', overflowX: 'auto' }}>
        {[
          { bg: '#ff6600', text: '🔥 Up to 70% OFF', sub: 'On Electronics' },
          { bg: '#003366', text: '👟 New Arrivals', sub: 'Latest Fashion' },
          { bg: '#2e7d32', text: '🚚 Free Delivery', sub: 'On orders above ₹499' },
          { bg: '#c62828', text: '⚡ Flash Sale', sub: 'Limited time deals' },
        ].map((banner, i) => (
          <div key={i} style={{ background: banner.bg, borderRadius: '12px', padding: '20px 30px', minWidth: '200px', color: 'white', cursor: 'pointer', flexShrink: 0 }}>
            <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>{banner.text}</p>
            <p style={{ margin: '5px 0 0', opacity: 0.85, fontSize: '13px' }}>{banner.sub}</p>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '10px', padding: '10px 40px', overflowX: 'auto' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            style={{ padding: '8px 20px', borderRadius: '20px', border: category === cat ? 'none' : '1px solid #ddd', background: category === cat ? '#003366' : 'white', color: category === cat ? 'white' : '#333', cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: category === cat ? 'bold' : 'normal', fontSize: '14px' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div style={{ padding: '20px 40px' }}>
        <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '22px' }}>
          {category === 'All' ? '🛍️ All Products' : `📦 ${category}`}
          <span style={{ color: '#666', fontSize: '16px', fontWeight: 'normal', marginLeft: '10px' }}>({filtered.length} items)</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {filtered.map(product => (
            <div key={product._id}
              style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.3s', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'; }}>

              {/* Product Image */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={product.image} alt={product.name}
                  style={{ width: '100%', height: '220px', objectFit: 'cover', transition: 'transform 0.3s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#ff6600', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                  {product.discount > 0 ? `${product.discount}% OFF` : 'NEW'}
                </div>
              </div>

              {/* Product Info */}
              <div style={{ padding: '15px' }}>
                <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#ff6600', fontWeight: '600', textTransform: 'uppercase' }}>{product.category}</p>
                <h3 style={{ margin: '0 0 8px', color: '#333', fontSize: '15px', fontWeight: '600', lineHeight: '1.3' }}>{product.name}</h3>
                <p style={{ margin: '0 0 10px', color: '#888', fontSize: '13px', lineHeight: '1.4' }}>{product.description?.slice(0, 60)}...</p>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                  <span style={{ background: '#388e3c', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>⭐ 4.{Math.floor(Math.random() * 5) + 1}</span>
                  <span style={{ color: '#888', fontSize: '12px' }}>(2.4k reviews)</span>
                </div>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '700', color: '#333' }}>₹{product.price}</span>
                  <span style={{ fontSize: '14px', color: '#888', textDecoration: 'line-through' }}>₹{Math.round(product.price * 1.3)}</span>
                  <span style={{ fontSize: '13px', color: '#388e3c', fontWeight: '600' }}>30% off</span>
                </div>

                <button onClick={() => addToCart(product._id)}
                  style={{ width: '100%', padding: '10px', background: 'linear-gradient(135deg, #003366, #0066cc)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', letterSpacing: '0.5px' }}>
                  🛒 ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#003366', color: 'white', padding: '40px', marginTop: '40px', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 10px' }}>🛒 ShopEZ</h3>
        <p style={{ margin: '0', opacity: 0.7 }}>Your one-stop destination for effortless online shopping</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px', opacity: 0.8 }}>
          <span>About Us</span>
          <span>Contact</span>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </div>
  );
}

export default Home;

