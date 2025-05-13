import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddProperty from './components/Addproperty';
import PropertyList from './components/PropertyList';

function App() {
  return (
    <Router>
      <NavBar />
      <Container sx={{ my: 10 }}>
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/property/:id" element={<PropertyList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addproperty" element={<AddProperty />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
