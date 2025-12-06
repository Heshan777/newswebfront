import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Update these imports to match the new file names
import { AuthProvider } from './context/AuthContext'; 
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ArticlePage from './pages/ArticlePage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', paddingBottom: '50px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;