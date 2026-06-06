import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/api/orders/mine', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setOrders(res.data))
      .catch(err => console.log(err));
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const getStatusColor = (status) => {
    if (status === 'delivered') return '#2e7d32';
    if (status === 'shipped') return '#1565c0';
    return '#e65100';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '30px' }}>
      <div style={{ maxWidth: '800px', margin: 'auto' }}>

        {/* Profile Card */}
        <div style={{ background: 'linear-gradient(135deg, #003366, #0066cc)', borderRadius: '16px', padding: '30px', color: 'white', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: '0', fontSize: '14px', opacity: 0.8 }}>Welcome back,</p>
            <h2 style={{ margin: '5px 0', fontSize: '28px' }}>👤 {user?.name}</h2>
            <p style={{ margin: '0', opacity: 0.8 }}>📧 {user?.email}</p>
          </div>
          <button onClick={logout}
            style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid white', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
            Logout
          </button>
        </div>

        {/* Orders */}
        <h2 style={{ color: '#003366', marginBottom: '15px' }}>📦 My Orders</h2>
        {orders.length === 0 ? (
          <div style={{ background: 'white', padding: '60px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
            <p style={{ fontSize: '50px' }}>📦</p>
            <h3 style={{ color: '#666' }}>No orders yet!</h3>
            <a href="/">
              <button style={{ padding: '12px 30px', background: '#003366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px' }}>
                Start Shopping
              </button>
            </a>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} style={{ background: 'white', borderRadius: '12px', padding: '20px', marginBottom: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: '#666', fontSize: '13px' }}>Order ID: {order._id.slice(-8).toUpperCase()}</span>
                <span style={{ background: getStatusColor(order.status), color: 'white', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ margin: '0 0 5px', color: '#333' }}>📍 {order.shippingAddress}</p>
                  <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>💳 {order.paymentMethod}</p>
                </div>
                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#003366', margin: '0' }}>₹{order.totalAmount}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;

