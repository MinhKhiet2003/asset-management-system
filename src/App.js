import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AssetProvider } from './contexts/AssetContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Settings from './components/pages/Settings';
import AssetList from './components/assets/AssetList';
import AssetForm from './components/assets/AssetForm';
import AssetDetail from './components/assets/AssetDetail';
import AssetMap from './components/assets/AssetMap';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <AuthProvider>
      <AssetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col" style={{ background: '#f0f4f8' }}>
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/assets" element={<AssetList />} />
                      <Route path="/assets/new" element={<AssetForm />} />
                      <Route path="/assets/edit/:id" element={<AssetForm />} />
                      <Route path="/assets/:id" element={<AssetDetail />} />
                      <Route path="/map" element={<AssetMap />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AssetProvider>
    </AuthProvider>
  );
}

export default App;