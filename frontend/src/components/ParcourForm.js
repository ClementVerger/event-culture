import React, { useEffect, useState } from 'react';
import api from '../api/api';

function ParcourForm({ parcour, onParcourUpdate, onClose }) {
    const [id, setId] = useState('');
    const [nom, setNom] = useState('');
    const [id_program, setIdProgram] = useState('');
    const [duree_parcour, setDureeParcour] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (parcour) {
            setId(parcour.id);
            setNom(parcour.nom);
            setIdProgram(parcour.id_program);
            setDureeParcour(parcour.duree_parcour);
            setDescription(parcour.description);
        }
    }
        , [parcour]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newParcour = {
                id,
                nom,
                id_program: Number(id_program),
                duree_parcour: Number(duree_parcour),
                description,
            };
            console.log(newParcour);
            if (!newParcour.id) {
                await api.post('/api/parcours', newParcour);
            } else {
                await api.put(`/api/parcours/${newParcour.id}`, newParcour);
            }
            onClose();
            onParcourUpdate();
        } catch (error) {
            console.error('Error saving parcour:', error);
        }
    }
    const handleDelete = async () => {
        if (id) {
            await api.delete(`/api/parcours/${id}`);
            onParcourUpdate(null);
            onClose();
        }
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded-md shadow-md w-1/3'>
                <h2 className='text-2xl font-bold text-center'>Ajouter un Parcour</h2>
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
                        <label className='block mb-2 tewxt-sm font-medium text-gray-900'>ID du programme</label>
                        <input
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
                            type="text"
                            value={id_program}
                            onChange={(e) => setIdProgram(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Durée</label>
                        <input
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
                            type="number"
                            value={duree_parcour}
                            onChange={(e) => setDureeParcour(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className='block mb-2 tewxt-sm font-medium text-gray-900'>Description</label>
                        <textarea
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded
                            -md focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full '
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            type="submit"
                            className='bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        >
                            Enregistrer
                        </button>
                        {parcour && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className='bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            >
                                Supprimer
                            </button>
                        )}
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="button" className='px-4 py-2 text-base bg-gray-300 rounded-md cursor-pointer hover:bg-gray-400 ml-2' onClick={onClose}>
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ParcourForm;