import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [dbProperties, setDbProperties] = useState([]);
  const [hardcodedProperties, setHardcodedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch both the db properties and the hardcoded properties
    const fetchDbProperties = axios.get('http://localhost:5000/api/properties');
    const fetchHardcodedProperties = axios.get('http://localhost:5000/api/hardcoded-properties');

    Promise.all([fetchDbProperties, fetchHardcodedProperties])
      .then(([dbRes, hardcodedRes]) => {
        setDbProperties(dbRes.data);
        setHardcodedProperties(hardcodedRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load properties');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>{error}</p>;
  if (dbProperties.length === 0 && hardcodedProperties.length === 0)
    return <p>No properties found.</p>;

  const combinedProperties = [
    ...hardcodedProperties.map((p) => ({
      id: `hardcoded-${p.id}`,
      title: p.title,
      description: p.description,
      location: p.location,
      price: p.price,
      image: p.image,
    })),
    ...dbProperties.map((p) => ({
      id: `db-${p.id}`,
      title: p.title || p.property_name,
      description: p.description,
      location: p.location,
      price: p.price,
      image: p.image || p.image_url,
    })),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {combinedProperties.map((property) => (
        <div key={property.id} className="border rounded-xl p-4 shadow-md">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover rounded-md mb-3"
          />
          <h2 className="text-xl font-semibold">{property.title}</h2>
          <p className="text-gray-700">{property.description}</p>
          <p className="text-sm text-gray-500">{property.location}</p>
          <p className="font-bold text-blue-600">${property.price.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;