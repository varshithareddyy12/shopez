import { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cart, setCart] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/api/cart', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCart(res.data))
      .catch(err => console.log(err));
  }, []);

  const removeItem = async (productId) => {
    await axios.delete(`/api/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  const total = cart?.items?.reduce((sum, item) =>
    sum + item.productId?.price * item.quantity, 0) || 0;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '30px' }}>
      <div style={{ maxWidth: '800px', margin: 'auto' }}>
        <h1 style={{ color: '#003366', marginBottom: '20px' }}>🛒 My Cart</h1>
        {!cart || cart.items?.length === 0 ? (
          <div style={{ background: 'white', padding: '60px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '60px' }}>🛒</p>
            <h2 style={{ color: '#666' }}>Your cart is empty!</h2>
            <a href="/">
              <button style={{ padding: '12px 30px', background: '#003366', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', marginTop: '15px' }}>
                Start Shopping
              </button>
            </a>
          </div>
        ) : (
          <div>
            {cart.items?.map(item => (
              <div key={item._id} style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img src={item.productId?.image} alt={item.productId?.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 5px', color: '#333' }}>{item.productId?.name}</h3>
                  <p style={{ margin: '0', color: '#666' }}>Quantity: {item.quantity}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#003366', margin: '0 0 10px' }}>₹{item.productId?.price * item.quantity}</p>
                  <button onClick={() => removeItem(item.productId?._id)}
                    style={{ padding: '6px 14px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Total:</span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#003366' }}>₹{total}</span>
              </div>
              <a href="/checkout">
                <button style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #003366, #0066cc)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Proceed to Checkout →
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;

