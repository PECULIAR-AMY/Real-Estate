const PropertyList = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return <p>No properties found.</p>;
  }

  return (
    <ul>
      {properties.map((property) => (
        <li key={property.id}>
          {property.name} – ${property.price}
        </li>
      ))}
    </ul>
  );
};

export default PropertyList;
