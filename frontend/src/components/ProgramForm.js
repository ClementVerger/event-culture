import React, { useState } from 'react';
import api from '../api/api';

function ProgramForm({ onClose, onProgramUpdate }) {
    const [id_event, setId_event] = useState('');
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [duree_jours, setDuree_jours] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/programs', { id_event, titre, description, duree_jours });
            onClose();
            onProgramUpdate();
        } catch (error) {
            console.error('Error adding program:', error);
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded-md shadow-md w-1/3'>
                <h2 className='text-2xl font-bold text-center'>Ajouter un Programme</h2>
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
                        <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Description</label>
                        <textarea
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Durée</label>
                        <input
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
                            type="number"
                            value={duree_jours}
                            onChange={(e) => setDuree_jours(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block mb-2 tewxt-sm font-medium text-gray-900'>ID de l'événement</label>
                        <input
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
                            type="text"
                            value={id_event}
                            onChange={(e) => setId_event(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className='px-4 py-2 text-base bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700'>
                            Enregistrer
                        </button>
                        <button type="button" className='px-4 py-2 text-base bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400 ml-2' onClick={onClose}>
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProgramForm;