import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import useAuthStore from './stores/authStore';
import { Container } from 'react-bootstrap';

function App() {
  const { checkAuth, isLoadingAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoadingAuth) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <CustomNavbar />
      <Container className="mt-4 mb-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/admin" 
            element={
              isAuthenticated && user?.role === 'admin' 
                ? <AdminPage /> 
                : <Navigate to="/" />
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;