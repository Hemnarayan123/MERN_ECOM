import React from 'react'
import { useAuth } from "../context/AuthToken";
import { Link } from 'react-router-dom';
function Search() {


    const { search } = useAuth();

    return (
        <div>
            <h1>{!search?.result ? 'No results' : search.result.length < 1 ? 'No results' : `Found ${search.result.length} results`}</h1>
            <div className="container mx-auto p-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {search?.result.map((product) => (
        <Link key={product._id} to={`/product-detail/${product._id}`} className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
          <img className="w-full object-contain h-64 bg-gray-200" src={`http://localhost:1000/image/${product.image}`} alt={product.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{product.name}</div>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Price:   ₹{product.price}
            </span>
          </div>
        </Link>
      ))}
    </div>
  </div>
        </div>
    );
}

export default Search