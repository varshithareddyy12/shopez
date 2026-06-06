import { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addProduct = async () => {
    if (!name || !price || !image || !category) { alert('Please fill all fields!'); return; }
    try {
      await axios.post('/api/products', { name, description, price, image, category, stock }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Product added! ✅');
      window.location.reload();
    } catch (err) {
      alert('Failed! Make sure you are admin.');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await axios.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    window.location.reload();
  };

  const inputStyle = { width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '30px' }}>
      <div style={{ maxWidth: '1000px', margin: 'auto' }}>
        <h1 style={{ color: '#003366' }}>⚙️ Admin Dashboard</h1>

        {/* Add Product */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '25px', marginBottom: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>➕ Add New Product</h2>
          <input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
          <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={inputStyle} />
          <input placeholder="Price (₹)" type="number" value={price} onChange={e => setPrice(e.target.value)} style={inputStyle} />
          <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} style={inputStyle} />
          <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} style={inputStyle} />
          <input placeholder="Stock" type="number" value={stock} onChange={e => setStock(e.target.value)} style={inputStyle} />
          <button onClick={addProduct}
            style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #003366, #0066cc)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            Add Product ✅
          </button>
        </div>

        {/* Products List */}
        <h2 style={{ color: '#333', marginBottom: '15px' }}>📦 All Products ({products.length})</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
          {products.map(product => (
            <div key={product._id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 5px', color: '#333' }}>{product.name}</h3>
                <p style={{ margin: '0 0 5px', color: '#003366', fontWeight: 'bold' }}>₹{product.price}</p>
                <p style={{ margin: '0 0 10px', color: '#666', fontSize: '13px' }}>Stock: {product.stock}</p>
                <button onClick={() => deleteProduct(product._id)}
                  style={{ width: '100%', padding: '8px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
