import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import HomePage from './Pages/HomePage';
import PrivateRoute from './components/Auth/ProtectedRoute';


function App() {
  // const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* User Side Routes */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }  
        />
        {/* <Route path="/hotel-details/:id" element={<HotelDetail />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/profile" element={<Profile />} /> */}
        
        {/* Admin Side Routes */}
        {/* <Route path="/admin" element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          } 
        />
        <Route path='/reservations' element={<Reservations />} /> */}
      </Routes>
    </Router>
  );
}

export default App;