import React, { useState } from 'react';

const EventModal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Ajouter un Événement</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nom de l'événement</label>
                        <input type="text" className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Lieu</label>
                        <input type="text" className="w-full px-3 py-2 border rounded-md" required />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button type="button" className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose}>Annuler</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Ajouter</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const EventList = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleAdd = () => {
        setIsAddModalOpen(true);
    };

    const handleClose = () => {
        setIsAddModalOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ajoutez ici la logique d'ajout d'événement
        alert("Événement ajouté !");
        setIsAddModalOpen(false);
    };

    return (
        <div>
            <div className='flex justify-end'>
                <button onClick={handleAdd} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700'>
                    + Ajouter un Événement
                </button>
            </div>
            <EventModal isOpen={isAddModalOpen} onClose={handleClose} onSubmit={handleSubmit} />
        </div>
    );
};

export default EventList;
