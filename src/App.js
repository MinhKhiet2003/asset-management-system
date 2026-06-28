import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AssetProvider } from './contexts/AssetContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AssetList from './components/assets/AssetList';
import AssetForm from './components/assets/AssetForm';
import AssetDetail from './components/assets/AssetDetail';
import AssetMap from './components/assets/AssetMap';
import Dashboard from './components/dashboard/Dashboard';
import './index.css';

function App() {
  return (
    <AssetProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <div className="container" style={{ padding: '1.5rem 0' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/assets" element={<AssetList />} />
                <Route path="/assets/new" element={<AssetForm />} />
                <Route path="/assets/edit/:id" element={<AssetForm />} />
                <Route path="/assets/:id" element={<AssetDetail />} />
                <Route path="/map" element={<AssetMap />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AssetProvider>
  );
}

export default App;