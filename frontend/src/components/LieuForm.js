import React, { useState } from 'react';
import api from '../api/api';

function LieuForm({ onClose, onLieuUpdate }) {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/lieux', { nom, adresse, latitude, longitude, description });
      onClose();
      onLieuUpdate();

    } catch (error) {
      console.error('Lieux failed:', error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-6 rounded-md shadow-md w-1/3'>
        <h2 className='text-2xl font-bold text-center'>Ajouter un Lieu</h2>
        <form className="max-w-sm mx-auto px-8 pb-6 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Nom</label>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Adresse</label>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Latitude</label>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
              type="number"
              step="any"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Longitude</label>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
              type="number"
              step="any"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Description</label>
            <input
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>Annuler</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );

}

export default LieuForm;


{/*}
  <form className="lieu-form" onSubmit={handleSubmit}>
    <h2>Lieux</h2>
    <div className="mb-4">
      <label>Nom</label>
      <input
        type="text"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label>Adresse</label>
      <input
        type="text"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label>Latitude</label>
      <input
        type="number"
        step="any"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label>Longitude</label>
      <input
        type="number"
        step="any"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label>description</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </div>
    <button type="button" className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>Annuler</button>
    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Ajouter</button>
  </form>
  ); */}