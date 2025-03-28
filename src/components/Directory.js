// src/components/Directory.js
import React, { useState, useEffect } from 'react';
import { fetchRecords } from '../services/airtableService';
import './Directory.css'; // We'll create this next

const Directory = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Table name from your Airtable base
  const TABLE_NAME = 'Listings'; // Change this to match your table name
  
  useEffect(() => {
    const getListings = async () => {
      try {
        setLoading(true);
        const data = await fetchRecords(TABLE_NAME);
        setListings(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching listings:', err);
        setError('Failed to load directory listings. Please try again later.');
        setLoading(false);
      }
    };
    
    getListings();
  }, []);
  
  // Extract unique categories for filter dropdown
  const categories = [...new Set(listings.map(item => item.Category))].filter(Boolean);
  
  // Filter listings based on search and category
  const filteredListings = listings.filter(listing => {
    const matchesSearch = searchTerm === '' || 
      (listing.Name && listing.Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (listing.Description && listing.Description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === '' || listing.Category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle category selection
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  if (loading) return <div className="directory-loading">Loading directory...</div>;
  if (error) return <div className="directory-error">{error}</div>;
  
  return (
    <div className="directory-container">
      <h1>Directory Listings</h1>
      
      <div className="directory-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="category-filter">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="directory-results">
        <p>{filteredListings.length} listings found</p>
        
        {filteredListings.length === 0 ? (
          <div className="no-results">No listings match your search criteria.</div>
        ) : (
          <div className="listings-grid">
            {filteredListings.map(listing => (
              <div key={listing.id} className="listing-card">
                {listing.Image && listing.Image[0] && (
                  <div className="listing-image">
                    <img src={listing.Image[0].url} alt={listing.Name} />
                  </div>
                )}
                
                <div className="listing-details">
                  <h2>{listing.Name}</h2>
                  {listing.Category && <span className="category-tag">{listing.Category}</span>}
                  {listing.Description && <p>{listing.Description}</p>}
                  
                  {listing.Website && (
                    <a href={listing.Website} target="_blank" rel="noopener noreferrer" className="website-link">
                      Visit Website
                    </a>
                  )}
                  
                  {listing.Email && (
                    <a href={`mailto:${listing.Email}`} className="contact-link">
                      Contact
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;