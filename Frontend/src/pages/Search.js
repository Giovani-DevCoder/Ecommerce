import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import SearchResults from '../components/SearchResults';

const Search = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);

    const fetchProduct = async() => {
        setLoading(true)
        const response = await fetch(`${SummaryApi.searchProduct.url}?q=${query}`);
        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data)
    }

    useEffect(()=>{
        fetchProduct()
    },[query])

    return (
        <div className="container mx-auto p-4">
            {/* Search Header Section */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800">Search Results for: {query}</h1>
              <p className="text-lg font-semibold text-gray-600 mt-2">
                {data.length} {data.length === 1 ? "item found" : "items found"}
              </p>
            </div>
            
            {/* Results Section */}
            <div className="min-h-[300px]">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-gray-500">Loading...</p>
                </div>
              ) : data.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-lg text-gray-500">No products found matching your search.</p>
                </div>
              ) : (
                <SearchResults loading={loading} data={data} />
              )}
            </div>
        </div>
    );
};

export default Search;