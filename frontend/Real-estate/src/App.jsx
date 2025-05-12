import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import NavBar from './components/NavBar';
import PropertyList from './components/HomePage';
import PropertyDetail from './components/PropertyList';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddProperty from './components/AddProperty';

const mockProperties = [
  {
    id: 1,
    title: 'Modern Apartment in Downtown',
    beds: 2,
    price: '$1,200/month',
  },
  {
    id: 2,
    title: 'Cozy Condo Near Park',
    beds: 1,
    price: '$950/month',
  },
];

function App() {
  return (
    <Router>
      <Container sx={{ my: 10 }}>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Typography variant="h4" sx={{ mb: 6, fontWeight: 'bold' }}>
                  Property Listings (1–2 Beds)
                </Typography>
                <PropertyList properties={mockProperties} />
              </>
            }
          />
          <Route
            path="/property/:id"
            element={<PropertyDetail properties={mockProperties} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addproperty" element={<AddProperty />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
