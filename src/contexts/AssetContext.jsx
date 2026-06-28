import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchAssets, addAsset, updateAsset, deleteAsset } from '../services/api';

const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    try {
      setLoading(true);
      const data = await fetchAssets();
      setAssets(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addNewAsset = async (asset) => {
    try {
      const newAsset = await addAsset(asset);
      setAssets([...assets, newAsset]);
      return newAsset;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const editAsset = async (id, updatedData) => {
    try {
      const updated = await updateAsset(id, updatedData);
      setAssets(assets.map(a => a.id === id ? updated : a));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeAsset = async (id) => {
    try {
      await deleteAsset(id);
      setAssets(assets.filter(a => a.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AssetContext.Provider value={{ assets, loading, error, addNewAsset, editAsset, removeAsset, loadAssets }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => useContext(AssetContext);