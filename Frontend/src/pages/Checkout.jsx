import { useState } from 'react';
import axios from 'axios';

function Checkout() {
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('COD');
  const token = localStorage.getItem('token');

  const placeOrder = async () => {
    if (!address) { alert('Please enter your address!'); return; }
    try {
      const cart = await axios.get('/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const products = cart.data.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price
      }));

      const totalAmount = cart.data.items.reduce((sum, item) =>
        sum + item.productId.price * item.quantity, 0);

      await axios.post('/api/orders', {
        products,
        shippingAddress: address,
        paymentMethod: payment,
        totalAmount
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Order placed successfully! 🎉');
      window.location.href = '/profile';
    } catch (error) {
      alert('Order failed! Please login first.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px' }}>
        <h1 style={{ color: '#003366', marginBottom: '25px', textAlign: 'center' }}>📦 Checkout</h1>

        <h3 style={{ color: '#333', marginBottom: '10px' }}>📍 Shipping Address</h3>
        <textarea
          placeholder="Enter your full address..."
          value={address}
          onChange={e => setAddress(e.target.value)}
          style={{ width: '100%', padding: '12px', height: '100px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', marginBottom: '20px', boxSizing: 'border-box', resize: 'none' }}
        />

        <h3 style={{ color: '#333', marginBottom: '10px' }}>💳 Payment Method</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          {['COD', 'Card', 'UPI'].map(method => (
            <button key={method} onClick={() => setPayment(method)}
              style={{ flex: 1, padding: '12px', border: payment === method ? '2px solid #003366' : '1px solid #ddd', borderRadius: '8px', background: payment === method ? '#e8f0fe' : 'white', color: payment === method ? '#003366' : '#666', fontWeight: payment === method ? 'bold' : 'normal', cursor: 'pointer', fontSize: '14px' }}>
              {method === 'COD' ? '💵 COD' : method === 'Card' ? '💳 Card' : '📱 UPI'}
            </button>
          ))}
        </div>

        <button onClick={placeOrder}
          style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #003366, #0066cc)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
          Place Order 🛍️
        </button>
      </div>
    </div>
  );
}

export default Checkout;
