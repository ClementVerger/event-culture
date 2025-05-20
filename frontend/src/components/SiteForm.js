import React, { useEffect, useState } from 'react';
import api from '../api/api';

function SiteForm({ site, onsiteUpdate, lieux, onClose }) {
    const [id, setId] = useState('');
    const [titre, setTitre] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [histoire, setHistoire] = useState('');
    const [type, setType] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [id_lieu, setIdLieu] = useState('');

    useEffect(() => {
        if (site) {
            setId(site.id);
            setTitre(site.titre);
            setImageUrl(site.image_url);
            setHistoire(site.histoire);
            setType(site.type);
            setLatitude(site.latitude);
            setLongitude(site.longitude);
            setIdLieu(site.id_lieu);
        }
    }
        , [site]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newSite = {
                id,
                titre,
                image_url,
                histoire,
                type,
                latitude: Number(latitude),
                longitude: Number(longitude),
                id_lieu: Number(id_lieu),
            };
            console.log(newSite);
            if (!newSite.id) {
                await api.post('/api/sites', newSite);
            } else {
                await api.put(`/api/sites/${newSite.id}`, newSite);
            }
            onClose();
            onsiteUpdate();
        } catch (error) {
            console.error('Error saving site:', error);
        }

    }
    const handleDelete = async () => {
        if (id) {
            await api.delete(`/api/sites/${id}`);
            onsiteUpdate(null);
            onClose();
        }
    };
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded-md shadow-md w-1/3'>
                <h2 className='text-2xl font-bold text-center'>Ajouter un site</h2>
                <form className="max-w-sm mx-auto px-8 pb-6 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Titre</label>
                        <input
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
                            type="text"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Image URL</label>
                        <input
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
                            type="text"
                            value={image_url}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Histoire</label>
                        <textarea
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
                            value={histoire}
                            onChange={(e) => setHistoire(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Type</label>
                        <input
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
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
                        <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Lieu</label>
                        <select id="lieu" value={id_lieu} onChange={(e) => setIdLieu(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option>Sélectionner un lieu</option>
                            {lieux.map((lieu) => (
                                <option key={lieu.id} value={lieu.id}> {lieu.nom} </option>
                            ))}
                        </select>
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

export default SiteForm;