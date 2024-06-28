import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { useAuth } from '../context/AuthToken';

function AllProduct() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('fashion');
  const [subcategory, setSubcategory] = useState('men');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {products, fetchProducts} = useAuth()

  const subcategories = {
    fashion: ['men', 'women', 'baby'],
    sports: ['indoor', 'outdoor'],
    gadgets: ['smartphones', 'laptops', 'accessories']
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('subcategory', subcategory);
    formData.append('file', file);

    if (editingProduct) {
      await axios.put(`http://localhost:1000/api/v1/editProd/${editingProduct._id}`, formData)
        .then(res => {
          console.log(res);
          fetchProducts();
          setEditingProduct(null);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      await axios.post('http://localhost:1000/api/v1/addProd', formData)
        .then(res => {
          console.log(res);
          fetchProducts();
        })
        .catch(err => {
          console.log(err);
        });
    }

    setName('');
    setPrice('');
    setDescription('');
    setCategory('fashion');
    setSubcategory('men');
    setFile(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setCategory(product.category);
    setSubcategory(product.subcategory);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:1000/api/v1/deleteProd/${id}`)
      .then(res => {
        console.log(res);
        fetchProducts();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowForm(false);
    setName('');
    setPrice('');
    setDescription('');
    setCategory('fashion');
    setSubcategory('men');
    setFile(null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button 
        onClick={() => setShowForm(true)} 
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 mb-6"
      >
        Add Product
      </button>

      {(showForm || editingProduct) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fade-in-up">
          <h2 className="text-2xl font-semibold mb-4">{editingProduct ? 'Update Product' : 'Add Product'}</h2>
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" 
            />
            <input 
              type="number" 
              placeholder="Price" 
              value={price} 
              onChange={e => setPrice(e.target.value)} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" 
            />
            <input 
              type="text" 
              placeholder="Description" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" 
            />
            <select 
              value={category} 
              onChange={e => {
                setCategory(e.target.value);
                setSubcategory(subcategories[e.target.value][0]);
              }} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            >
              <option value="fashion">Fashion</option>
              <option value="sports">Sports</option>
              <option value="gadgets">Gadgets</option>
            </select>
            <select 
              value={subcategory} 
              onChange={e => setSubcategory(e.target.value)} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            >
              {subcategories[category].map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            <input 
              type="file" 
              onChange={e => setFile(e.target.files[0])} 
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4" 
            />
            <button 
              onClick={handleUpdate} 
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 mb-4"
            >
              {editingProduct ? 'Update' : 'Upload'}
            </button>
            <button 
              onClick={handleCancel} 
              className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {products.map(product => (
            <li key={product._id} className="p-4 flex items-center animate-fade-in-up">
              <img 
                src={`http://localhost:1000/image/${product.image}`} 
                alt={product.name} 
                className="w-24 h-24 object-cover mr-4" 
              />
              <div className="flex-grow">
                <h5 className="text-xl font-semibold mb-2">{product.name}</h5>
                <p className="text-gray-700 mb-2">Price: ₹<span> </span>{product.price}</p>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-gray-600">Category: {product.category}</p>   {/* / {product.subcategory}*/}
              </div>
              <div className="flex-shrink-0">
                <button 
                  onClick={() => handleEdit(product)} 
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300 mr-2"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(product._id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllProduct;
